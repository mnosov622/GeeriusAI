import { getApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
import { saveUserToDb } from '@/lib/user-endpoints';
import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import MobileSidebar from './mobile-sidebar';

export default async function NavBar() {
	const apiLimitCount = await getApiLimitCount();
	const isPro = await checkSubscription();

	const user = await currentUser();

	const userEmail = user?.emailAddresses[0].emailAddress;
	const userName = user?.firstName + ' ' + user?.lastName;

	if (user) {
		await saveUserToDb({ email: userEmail!, userName });
	}

	return (
		<div className="flex items-center p-4">
			<MobileSidebar
				apiLimitCount={apiLimitCount}
				isPro={isPro}
			/>
			<div className="flex w-full justify-end min-h-[28px]">
				<UserButton afterSignOutUrl="/" />
			</div>
		</div>
	);
}
