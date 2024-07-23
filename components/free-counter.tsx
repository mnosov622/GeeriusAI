import { MAX_FREE_COUNTS } from '@/constants';
import { useProModal } from '@/hooks/use-pro-modal';
import { Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';

export default function FreeCounter({
	apiLimitCount = 0,
	isPro = false,
}: {
	apiLimitCount: number;
	isPro: boolean;
}) {
	const [mounted, setMount] = useState(false);

	const { onOpen } = useProModal();

	useEffect(() => {
		setMount(true);
	}, []);

	if (!mounted) {
		return null;
	}

	if (isPro) {
		return null;
	}

	return (
		<div className="px-3">
			<Card className="bg-white/10 border-0">
				<CardContent className="py-6">
					<div className="text-center text-sm text-white mb-4 space-y-2">
						<p>
							{apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
						</p>
						<Progress
							className="h-3"
							value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
						/>
					</div>
					<Button
						className="w-full"
						variant="premium"
						onClick={onOpen}
					>
						<Zap className="w-4 h-4 mr-2 fill-white" />
						Upgrade
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
