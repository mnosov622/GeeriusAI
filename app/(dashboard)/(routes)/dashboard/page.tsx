'use client';

import { Card } from '@/components/ui/card';
import { TOOLS } from '@/constants';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
	const router = useRouter();

	return (
		<div>
			<div className="mb-8 space-y-4">
				<h2 className="text-2xl md:text-4xl font-bold text-center">Explore the power of AI</h2>
				<p className="text-muted-foreground font-light text-sm md:text-lg text-center">
					Chat with the smartest AI - Experience the power of AI
				</p>
			</div>
			<div className="px-4 md:px-20 lg:px-32 space-y-4">
				{TOOLS.map((tool, index) => (
					<Card
						key={index}
						className={`p-4 border-black/5 flex items-center justify-between hover:shadow transition cursor-pointer`}
						title={tool.label}
						onClick={() => router.push(tool.href)}
					>
						<div className="flex items-center gap-x-4">
							<div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
								<tool.icon
									className={cn('w-8 h-8', tool.color)}
									size={24}
								/>
							</div>
							<div className="font-semibold">{tool.label}</div>
						</div>
						<ArrowRight className="w-5 h-5" />
					</Card>
				))}
			</div>
		</div>
	);
}
