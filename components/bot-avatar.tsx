import bot from '../public/robot.png';
import { Avatar, AvatarImage } from './ui/avatar';

export default function BotAvatar() {
	return (
		<Avatar className="h-10 w-10">
			<AvatarImage
				className="p-1 rounded-full"
				src={bot.src}
			/>
		</Avatar>
	);
}
