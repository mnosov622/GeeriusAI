import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

export const maxDuration = 300;

const maxMusicDuration = 60;

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
	try {
		const { userId } = auth();

		const body = await req.json();

		const { prompt, duration, type } = body;

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

		if (Number(duration) > maxMusicDuration) {
			return new NextResponse(`Duration should be less than ${maxMusicDuration} seconds`, {
				status: 400,
			});
		}

		const response = await replicate.run(
			'meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb',
			{
				input: {
					top_k: 250,
					top_p: 0,
					prompt: prompt,
					duration: Number(duration),
					temperature: 1,
					continuation: false,
					model_version: type,
					output_format: 'mp3',
					continuation_start: 0,
					multi_band_diffusion: false,
					normalization_strategy: 'peak',
					classifier_free_guidance: 3,
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
