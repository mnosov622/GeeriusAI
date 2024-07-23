'use client';

import axios from 'axios';
import { Zap } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

interface SubscriptionButtonProps {
	isPro: boolean;
}

export default function SubscriptionButton({ isPro = false }: SubscriptionButtonProps) {
	const [loading, setLoading] = useState(false);

	const handleOnClick = async () => {
		try {
			setLoading(true);
			const response = await axios.get('/api/stripe');

			window.location.href = response.data.url;
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button
			variant={isPro ? 'default' : 'premium'}
			onClick={handleOnClick}
			disabled={loading}
		>
			{isPro ? 'Manage Subscription' : 'Subscribe to Pro'}
			{!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
		</Button>
	);
}
