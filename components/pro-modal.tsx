import { TOOLS } from '@/constants';
import { useProModal } from '@/hooks/use-pro-modal';
import { cn } from '@/lib/utils';
import { Check, Zap } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from './ui/dialog';

export default function ProModal() {
	const { isOpen, onClose } = useProModal();

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
						<div className="flex items-center gap-x-2 font-bold py-1">
							Upgrade to GenerAI
							<Badge
								variant="premium"
								className="uppercase text-sm py-1"
							>
								Pro
							</Badge>
						</div>
					</DialogTitle>
					<DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
						{TOOLS.map((tool, index) => (
							<Card
								key={index}
								className="p-3 border-black/5 flex items-center justify-between"
							>
								<div className="flex items-center gap-x-4">
									<div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
										<tool.icon className={cn('w-6 h-6', tool.color)} />
									</div>
									<div className="font-semibold">{tool.label}</div>
								</div>
								<Check className="w-5 h-5 text-primary" />
							</Card>
						))}
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<Button
						size={'lg'}
						variant="premium"
						className="w-full"
					>
						Upgrade
						<Zap className="w-4 h-4 ml-2 fill-white" />
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
