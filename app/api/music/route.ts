import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

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
			return new NextResponse('Messages are required', { status: 400 });
		}

		const freeTrial = await checkApiLimit();

		if (!freeTrial) {
			return new NextResponse('Free Trial has expired', { status: 403 });
		}

		const input = {
			prompt: prompt,
			model_version: 'stereo-large',
			output_format: 'mp3',
			normalization_strategy: 'peak',
			auth: process.env.REPLICATE_API_TOKEN,
		};

		const response = await replicate.run(
			'meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb',
			{ input }
		);

		await increaseApiLimit();

		return new NextResponse(JSON.stringify(response), { status: 200 });
	} catch (e) {
		console.log('Music error', e);
		return new NextResponse('Internal server error', { status: 500 });
	}
}
