import prismadb from './prisma.db';

export async function saveUserToDb({ email, userName }: { email: string; userName: string }) {
	const user = await prismadb.users.findUnique({
		where: {
			email,
		},
	});

	if (!user) {
		await prismadb.users.create({
			data: {
				email,
				userName,
			},
		});
	}
}
