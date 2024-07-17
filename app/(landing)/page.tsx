import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Landing() {
	return (
		<div>
			<h1>GenerAI</h1>
			<p>AI platform</p>
			<div>
				<Link href="/sign-in">
					<Button>Login</Button>
				</Link>
				<Link href="/sign-up">
					<Button>Register</Button>
				</Link>
			</div>
		</div>
	);
}
