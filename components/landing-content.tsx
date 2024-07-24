'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const testimonials = [
	{
		name: 'Antonio',
		avatar: 'https://randomuser.me/api/portraits',
		title: 'Software Engineer',
		description:
			'This is the best app if you want to create some content for your needs. I love it!',
	},
	{
		name: 'Julia',
		avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
		title: 'Graphic Designer',
		description:
			'Incredible tool! It has streamlined my design process, and the results are always top-notch.',
	},
	{
		name: 'Marcus',
		avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
		title: 'Digital Marketer',
		description:
			'Using this app has significantly boosted our online engagement. Highly recommend it for marketing professionals.',
	},
	{
		name: 'Sophia',
		avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
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
								<div>
									<p className="text-lg">{testimonial.name}</p>
									<p className="text-zinc-400 text-sm">{testimonial.title}</p>
								</div>
							</CardTitle>
							<CardContent className="pt-4 px-0">
								<p className="text-sm">{testimonial.description}</p>
							</CardContent>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
}
