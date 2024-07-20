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
	amount: z.string().min(1).optional(),
	resolution: z.string().min(1).optional(),
});

export const amountOptions = [
	{
		value: '1',
		label: '1 Photo',
	},
	{
		value: '2',
		label: '2 Photos',
	},
	{
		value: '3',
		label: '3 Photos',
	},
	{
		value: '4',
		label: '4 Photos',
	},
	{
		value: '5',
		label: '5 Photos',
	},
];

export const resolutionOptions = [
	{
		value: '256x256',
		label: '256x256',
	},
	{
		value: '512x512',
		label: '512x512',
	},
	{
		value: '1024x1024',
		label: '1024x1024',
	},
];
