'use client';

import { useEffect, useState } from 'react';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<main className="bg-[#111827]">
			<div className="mx-auto max-w-screen-xl h-full bg-[#111827]">{children}</div>
		</main>
	);
}
