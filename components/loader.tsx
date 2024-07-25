import loaderIcon from '@/public/loader.svg';
import Image from 'next/image';

export default function Loader() {
	return (
		<div className="h-full flex flex-col gap-y-4 items-center justify-center">
			<div className="w-16 h-16 relative">
				<Image
					alt="Loader"
					src={loaderIcon}
					fill
				/>
			</div>
			<p className="text-sm text-muted-foreground">GeeriusAI is thinking...</p>
		</div>
	);
}
