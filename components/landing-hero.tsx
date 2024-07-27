'use client';

import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import TypeWriterComponent from 'typewriter-effect';
import { Button } from './ui/button';

export default function LandingHero() {
	const { isSignedIn } = useAuth();

	return (
		<div className="text-white font-bold p-6 text-center space-y-5">
			<div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
				<h1>The Best AI Tool for</h1>
				<div className="text-transparent bg-clip-text h-24  bg-gradient-to-r from-purple-400 to-pink-600">
					<TypeWriterComponent
						options={{
							strings: [
								'Music Generation',
								'Image Generation',
								'Chatbot Conversations',
								'Text to Speech Generation',
								'Code Generation',
							],
							autoStart: true,
							loop: true,
						}}
					/>
				</div>
			</div>
			<div className="text-sm md:text-xl font-light text-zinc-400">
				Create content with AI in seconds
			</div>
			<div>
				<Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
					<Button
						variant="premium"
						className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
						size={'lg'}
					>
						Start Generating For Free
					</Button>
				</Link>
			</div>
			<div className="text-zinc-400 text-sm md:text-sm font-normal">No credit card required</div>
		</div>
	);
}
