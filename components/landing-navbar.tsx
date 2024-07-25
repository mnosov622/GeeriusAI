'use client';

import logo from '@/public/logo-no-background.png';
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
				className="flex items-center"
			>
				<div className="relative h-12 w-14 mr-3">
					<Image
						src={logo}
						alt="logo"
						fill
					/>
				</div>
				<h1 className={`${font.className} text-white text-lg`}>Geerius AI</h1>
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
