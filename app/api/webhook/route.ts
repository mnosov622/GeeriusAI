import prismadb from '@/lib/prisma.db';
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const maxDuration = 60;

async function getRawBody(req: Request): Promise<Buffer> {
	const reader = req.body?.getReader();
	const chunks = [];

	if (!reader) {
		throw new Error('No readable stream found on request body.');
	}

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		chunks.push(value);
	}

	return Buffer.concat(chunks);
}

export async function POST(req: Request) {
	let event: Stripe.Event;

	try {
		const rawBody = await getRawBody(req);
		const signature = req.headers.get('Stripe-Signature') as string;

		event = stripe.webhooks.constructEvent(
			rawBody.toString(),
			signature,
			process.env.STRIPE_WEBHOOK_SECRET as string
		);
	} catch (e: any) {
		console.error(`Webhook error ${e.message}`);
		return new Response(`Webhook error: ${e.message}`, { status: 400 });
	}

	const session = event.data.object as Stripe.Checkout.Session;

	if (event.type === 'checkout.session.completed') {
		const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

		if (!session?.metadata?.userId) {
			return new Response('User ID is required', { status: 400 });
		}

		await prismadb.userSubscription.create({
			data: {
				stripeCustomerId: subscription.customer as string,
				stripeSubscriptionId: subscription.id as string,
				userId: session.metadata.userId,
				email: session.customer_email as string,
				stripePriceId: subscription.items.data[0].price.id,
				stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
			},
		});
	}

	if (event.type === 'invoice.payment_succeeded') {
		const subscription = await stripe.subscriptions.retrieve(session.subscription! as string);

		if (!session?.metadata?.userId) {
			return new Response('User ID is required', { status: 400 });
		}

		await prismadb.userSubscription.update({
			where: {
				stripeSubscriptionId: subscription.id,
			},
			data: {
				stripePriceId: subscription.items.data[0].price.id,
				stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
			},
		});
	}

	return new NextResponse(null, { status: 200 });
}
