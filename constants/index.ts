import {
	Code,
	ImageIcon,
	LayoutDashboard,
	MessageSquare,
	MusicIcon,
	Settings,
	VideoIcon,
} from 'lucide-react';
import * as z from 'zod';

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

export const ROUTES = [
	{
		label: 'Dashboard',
		icon: LayoutDashboard,
		color: 'text-sky-500',
		href: '/dashboard',
	},
	{
		label: 'Conversation',
		icon: MessageSquare,
		color: 'text-violet-500',
		href: '/conversation',
	},
	{
		label: 'Image Generation',
		icon: ImageIcon,
		color: 'text-pink-700',
		href: '/image',
	},
	{
		label: 'Video Generation',
		icon: VideoIcon,
		color: 'text-orange-700',
		href: '/video',
	},
	{
		label: 'Music Generation',
		icon: MusicIcon,
		color: 'text-emerald-700',
		href: '/music',
	},
	{
		label: 'Code Generation',
		icon: Code,
		color: 'text-green-700',
		href: '/code',
	},
	{
		label: 'Settings',
		icon: Settings,
		href: '/settings',
	},
];

export const formSchema = z.object({
	prompt: z.string().min(1, {
		message: 'Prompt is required',
	}),
});
