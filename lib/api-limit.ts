import { MAX_FREE_COUNTS } from '@/constants';
import { auth } from '@clerk/nextjs/server';
import prismadb from './prisma.db';

export const increaseApiLimit = async () => {
	const { userId } = auth();

	if (!userId) {
		return;
	}

	const userApiLimit = await prismadb.userApiLimit.findUnique({
		where: { userId },
	});

	if (userApiLimit) {
		await prismadb.userApiLimit.update({
			where: { userId },
			data: { count: { increment: 1 } },
		});
	} else {
		await prismadb.userApiLimit.create({
			data: {
				userId,
				count: 1,
			},
		});
	}
};

export const checkApiLimit = async () => {
	const { userId } = auth();

	if (!userId) {
		return false;
	}

	const userApiLimit = await prismadb.userApiLimit.findUnique({
		where: { userId },
	});

	if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
		return true;
	}

	if (userApiLimit.count >= 5) {
		return false;
	}

	return false;
};

export const getApiLimitCount = async () => {
	const { userId } = auth();

	if (!userId) {
		return 0;
	}

	const userApiLimit = await prismadb.userApiLimit.findUnique({
		where: { userId },
	});

	if (!userApiLimit) {
		return 0;
	}

	return userApiLimit.count;
};
