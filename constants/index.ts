import { Code, ImageIcon, MessageSquare, MusicIcon, VideoIcon } from 'lucide-react';
import * as z from 'zod';

export const MAX_FREE_COUNTS = 5;

export const TOOLS = [
	{
		label: 'Conversation',
		icon: MessageSquare,
		color: 'text-violet-500',
		bgColor: 'bg-violet-500/10',
		href: '/conversation',
	},
	{
		label: 'Image Generation',
		icon: ImageIcon,
		color: 'text-pink-700',
		bgColor: 'bg-pink-700/10',
		href: '/image',
	},
	{
		label: 'Video Generation',
		icon: VideoIcon,
		color: 'text-orange-700',
		bgColor: 'bg-orange-700/10',
		href: '/video',
	},
	{
		label: 'Music Generation',
		icon: MusicIcon,
		color: 'text-emerald-700',
		bgColor: 'bg-emerald-700/10',
		href: '/music',
	},
	{
		label: 'Code Generation',
		icon: Code,
		color: 'text-green-700',
		bgColor: 'bg-green-700/10',
		href: '/code',
	},
];

export const formSchema = z.object({
	prompt: z.string().min(1, {
		message: 'Image Prompt is required',
	}),
	type: z.string().optional(),
	duration: z.string().optional(),
});

export const melodyType = [
	{
		value: 'stereo-melody-large',
		label: 'Stereo Melody Large',
	},
	{
		value: 'stereo-large',
		label: 'Stereo Large',
	},
	{
		value: 'melody-large',
		label: 'Melody Large',
	},
	{
		value: 'large',
		label: 'Large',
	},
];
