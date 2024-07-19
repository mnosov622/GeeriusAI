import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessage } from 'openai/resources/chat/index.mjs';

const openai = new OpenAI({
	apiKey: process.env.OPEN_AI_KEY,
});

const instructionMessage: ChatCompletionMessage = {
	role: 'system',
	content:
		'You are a code generator. You must only in markdown code snippets. Use Code comments for explanations.',
};

export async function POST(req: Request) {
	try {
		const { userId } = auth();

		const body = await req.json();

		const { messages } = body;

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		if (!openai.apiKey) {
			return new NextResponse('OpenAI API KEY not configured', { status: 500 });
		}

		if (!messages) {
			return new NextResponse('Messages are required', { status: 400 });
		}

		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [instructionMessage, ...messages],
		});

		return new NextResponse(JSON.stringify(response.choices[0].message), { status: 200 });
	} catch (e) {
		console.log('Code error', e);
		return new NextResponse('Internal server error', { status: 500 });
	}
}
