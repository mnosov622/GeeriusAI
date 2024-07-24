import { getApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
import { UserButton } from '@clerk/nextjs';
import MobileSidebar from './mobile-sidebar';

export default async function NavBar() {
	const apiLimitCount = await getApiLimitCount();
	const isPro = await checkSubscription();

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
