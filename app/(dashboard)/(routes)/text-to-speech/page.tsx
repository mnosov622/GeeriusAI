'use client';

import Empty from '@/components/empty';
import Heading from '@/components/heading';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { formSchema, speakerType } from '@/constants';
import { useProModal } from '@/hooks/use-pro-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { track } from '@vercel/analytics';
import axios from 'axios';
import { Speech } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

export default function TextToSpeech() {
	const { onOpen } = useProModal();

	const router = useRouter();
	const [music, setMusic] = useState<string | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
			speaker: 'announcer',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		track('Text to Speech Generation');
		try {
			setMusic(null);

			const response = await axios.post('/api/text-to-speech', values);

			setMusic(response.data.audio_out);

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
				title="Text to Speech Generation"
				description="Turn your prompt into voice of your choice"
				icon={Speech}
				iconColor="text-blue-700"
				bgColor="bg-blue-700/10"
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
									<FormItem className="col-span-12 lg:col-span-8">
										<FormControl className="m-0 p-0">
											<Input
												className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
												{...field}
												placeholder="Hello, how are you?"
												disabled={isLoading}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<FormField
								name="speaker"
								control={form.control}
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-2">
										<Select
											{...field}
											disabled={isLoading}
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue defaultValue={field.value} />
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												{speakerType.map((option) => (
													<SelectItem
														key={option.value}
														value={option.value}
													>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
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
