'use client';

import Image from 'next/image';
import testimonal1 from '../public/testimonials/testimonial-1.jpg';
import testimonal2 from '../public/testimonials/testimonial-2.jpg';
import testimonal3 from '../public/testimonials/testimonial-3.jpg';
import testimonal4 from '../public/testimonials/testimonial-4.jpg';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const testimonials = [
	{
		name: 'Antonio',
		avatar: testimonal1,
		title: 'Software Engineer',
		description:
			'This is the best app if you want to create some copyright-free content for your application. I love it!',
	},
	{
		name: 'Julien',
		avatar: testimonal2,
		title: 'Graphic Designer',
		description:
			'Incredible tool! It has streamlined my design process, and the results are always top-notch.',
	},
	{
		name: 'Sophia',
		avatar: testimonal3,
		title: 'Digital Marketer',
		description:
			'Using this app has significantly boosted our online engagement. Highly recommend it for marketing professionals.',
	},
	{
		name: 'Marcus',
		avatar: testimonal4,
		title: 'Content Creator',
		description:
			'As a content creator, this app has been a game-changer for me. It’s easy to use and very effective.',
	},
];

export default function LandingContent() {
	return (
		<div className="px-10 pb-20 ">
			<h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{testimonials.map((testimonial) => (
					<Card
						key={testimonial.description}
						className="bg-[#192339] border-none text-white"
					>
						<CardHeader>
							<CardTitle className="flex items-center gap-x-2">
								<div className="flex items-center gap-x-2">
									<Image
										src={testimonial.avatar}
										alt={testimonial.name}
										width={50}
										height={50}
										className="rounded-full"
									/>

									<div className="flex flex-col">
										<p className="text-lg">{testimonial.name}</p>
										<p className="text-zinc-400 text-sm">{testimonial.title}</p>
									</div>
								</div>
							</CardTitle>
							<CardContent className="pt-4 px-0">
								<p>{testimonial.description}</p>
							</CardContent>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
}
