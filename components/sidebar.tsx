'use client';

import { cn } from '@/lib/utils';
import {
	Code,
	ImageIcon,
	LayoutDashboard,
	MessageSquare,
	MusicIcon,
	Settings,
	Speech,
	VideoIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '../public/logo-no-background.svg';
import FreeCounter from './free-counter';

const routes = [
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
		label: 'Text to Speech Generation',
		icon: Speech,
		color: 'text-blue-700',
		href: '/text-to-speech',
	},
	{
		label: 'Settings',
		icon: Settings,
		href: '/settings',
	},
];

export default function Sidebar({
	apiLimitCount = 0,
	isPro = false,
}: {
	apiLimitCount: number;
	isPro: boolean;
}) {
	const pathName = usePathname();

	return (
		<div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
			<div className="px-3 py-2 flex-1">
				<Link
					href="/dashboard"
					className="flex items-center pl-3"
				>
					<div className="relative w-24 h-24 mr-4 mt-[-30px] mb-[10px]">
						<Image
							fill
							alt="logo"
							src={logo}
						/>
					</div>
				</Link>
				<div className="space-y-1">
					{routes.map((route, index) => (
						<Link
							key={index}
							href={route.href}
							className={cn(
								'flex items-center pl-3 group p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
								pathName === route.href ? 'text-white bg-white/10' : 'text-zinc-400'
							)}
						>
							<div className="flex items-center space-x-4">
								<route.icon className={`w-6 h-6 ${route.color}`} />
								<span>{route.label}</span>
							</div>
						</Link>
					))}
				</div>
			</div>

			<FreeCounter
				apiLimitCount={apiLimitCount}
				isPro={isPro}
			/>
		</div>
	);
}
