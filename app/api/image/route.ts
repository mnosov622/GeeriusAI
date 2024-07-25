import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

export const maxDuration = 300;

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
	try {
		const { userId } = auth();

		const body = await req.json();

		const { prompt } = body;

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		if (!prompt) {
			return new NextResponse('prompt, amount and resolution are required', { status: 400 });
		}

		const freeTrial = await checkApiLimit();

		const isPro = await checkSubscription();

		if (!freeTrial && !isPro) {
			return new NextResponse('Free Trial has expired', { status: 403 });
		}

		const input = {
			cfg: 3.5,
			steps: 28,
			prompt: prompt,
			aspect_ratio: '3:2',
			output_format: 'webp',
			output_quality: 90,
			negative_prompt: '',
			prompt_strength: 0.85,
		};

		const response = await replicate.run('stability-ai/stable-diffusion-3', { input });

		if (!isPro) {
			await increaseApiLimit();
		}

		return new NextResponse(JSON.stringify(response), { status: 200 });
	} catch (e) {
		console.log('Image error', e);
		return new NextResponse('Internal server error', { status: 500 });
	}
}
