import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(req: Request) {
	try {
		const { userId } = auth();

		const body = await req.json();

		const { prompt, amount = 1, resolution = '512x512' } = body;

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		if (!openai.apiKey) {
			return new NextResponse('OpenAI API KEY not configured', { status: 500 });
		}

		if (!prompt || !amount || !resolution) {
			return new NextResponse('prompt, amount and resolution are required', { status: 400 });
		}

		const freeTrial = await checkApiLimit();

		if (!freeTrial) {
			return new NextResponse('Free Trial has expired', { status: 403 });
		}

		const response = await openai.images.generate({
			prompt: prompt,
			n: parseInt(amount, 10),
			size: resolution,
		});

		await increaseApiLimit();

		return new NextResponse(JSON.stringify(response.data), { status: 200 });
	} catch (e) {
		console.log('Image error', e);
		return new NextResponse('Internal server error', { status: 500 });
	}
}
