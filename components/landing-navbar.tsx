'use client';

import logo from '@/public/logo-no-background.svg';
import { useAuth } from '@clerk/nextjs';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

const font = Montserrat({ subsets: ['latin'], weight: '600' });

import { track } from '@vercel/analytics';

export default function LandingNavbar() {
	const { isSignedIn } = useAuth();

	return (
		<nav className="p-4 bg-transparent flex items-center justify-between">
			<Link
				href="/"
				className="flex-items-center"
			>
				<div className="relative h-32 w-32 mr-4">
					<Image
						src={logo}
						alt="logo"
						fill
					/>
				</div>
			</Link>

			<div className="flex items-center gap-x-2">
				<Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
					<Button
						variant="outline"
						className="rounded-full"
						size={'lg'}
						onClick={() => (isSignedIn ? track('Go to dashboard') : track('Clicked Sign Up'))}
					>
						Get Started
					</Button>
				</Link>
			</div>
		</nav>
	);
}
