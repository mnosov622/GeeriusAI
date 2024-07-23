import prismadb from '@/lib/prisma.db';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
	const body = await req.json();

	const signature = headers().get('Stripe-Signature') as string;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
	} catch (e: any) {
		return new Response(`Webhook error ${e?.message}`, { status: 400 });
	}

	const session = event.data.object as Stripe.Checkout.Session;

	if (event.type === 'checkout.session.completed') {
		const subscription = await stripe.subscriptions.retrieve(session.subscription! as string);

		if (!session?.metadata?.userId) {
			return new Response('user Id is required', { status: 400 });
		}

		await prismadb.userSubscription.create({
			data: {
				stripeCustomerId: subscription.customer as string,
				stripeSubscriptionId: subscription.id as string,
				userId: session.metadata.userId,
				stripePriceId: subscription.items.data[0].price.id,
				stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
			},
		});
	}

	if (event.type === 'invoice.payment_succeeded') {
		const subscription = await stripe.subscriptions.retrieve(session.subscription! as string);

		if (!session?.metadata?.userId) {
			return new Response('user Id is required', { status: 400 });
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
