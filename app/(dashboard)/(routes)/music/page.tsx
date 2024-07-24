'use client';

import Empty from '@/components/empty';
import Heading from '@/components/heading';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema } from '@/constants';
import { useProModal } from '@/hooks/use-pro-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Music } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

export default function MusicPage() {
	const { onOpen } = useProModal();

	const router = useRouter();
	const [music, setMusic] = useState<string | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setMusic(null);

			const response = await axios.post('/api/music', values);

			setMusic(response.data);

			form.reset();
		} catch (e: any) {
			if (e?.response?.status === 403) {
				onOpen();
			} else {
				toast.error('Something went wrong. Try again.');
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="Music Generation"
				description="Turn your prompt into music"
				icon={Music}
				iconColor="text-emerald-500"
				bgColor="bg-emerald-500/10"
			/>

			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
						>
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="m-0 p-0">
											<Input
												className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
												{...field}
												placeholder="Piano solo"
												disabled={isLoading}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								className="col-span-12 lg:col-span-2 w-full"
								type="submit"
								disabled={isLoading}
							>
								Generate
							</Button>
						</form>
					</Form>
				</div>
				<div className="space-y-4 mt-4">
					{isLoading && (
						<div className="p-8 rounded-lg w-full flex items-center justify-center">
							<Loader />
						</div>
					)}
					{!music && !isLoading && <Empty label="No music generated" />}
					{music && (
						<audio
							controls
							className="w-full mt-8"
						>
							<source
								src={music}
								type="audio/mp3"
							/>
							Your browser does not support the audio element.
						</audio>
					)}
				</div>
			</div>
		</div>
	);
}
