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

		const { prompt, speaker } = body;

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		if (!prompt) {
			return new NextResponse('Messages are required', { status: 400 });
		}

		const freeTrial = await checkApiLimit();
		const isPro = await checkSubscription();

		if (!freeTrial && !isPro) {
			return new NextResponse('Free Trial has expired', { status: 403 });
		}

		const response = await replicate.run(
			'suno-ai/bark:b76242b40d67c76ab6742e987628a2a9ac019e11d56ab96c4e91ce03b79b2787',
			{
				input: {
					prompt: prompt,
					text_temp: 0.7,
					output_full: false,
					waveform_temp: 0.7,
					history_prompt: speaker,
				},
			}
		);

		if (!isPro) {
			await increaseApiLimit();
		}

		return new NextResponse(JSON.stringify(response), { status: 200 });
	} catch (e) {
		console.log('Music error', e);
		return new NextResponse('Internal server error', { status: 500 });
	}
}
