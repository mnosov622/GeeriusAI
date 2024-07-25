'use client';

import Empty from '@/components/empty';
import Heading from '@/components/heading';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formSchema } from '@/constants';
import { useProModal } from '@/hooks/use-pro-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { track } from '@vercel/analytics';
import axios from 'axios';
import { Download, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

export default function ImagePage() {
	const { onOpen } = useProModal();

	const router = useRouter();
	const [image, setImage] = useState<string | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		track('Image Generation');
		try {
			setImage(null);

			const response = await axios.post('/api/image', values);

			console.log('Image response', response.data[0]);

			setImage(response.data[0]);

			form.reset();
		} catch (e: any) {
			if (e?.response?.status === 403) {
				onOpen();
			} else {
				toast.error('Something went wrong. Try again.');
			}

			console.log('Conversation error', e);
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="Image Generation"
				description="Turn your prompt into an image"
				icon={ImageIcon}
				iconColor="text-pink-700"
				bgColor="bg-pink-700/10"
			/>

			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="rounded-lg border w-full flex p-4 px-3 md:px-6 focus-within:shadow-sm"
						>
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10 w-full">
										<FormControl className="m-0 p-0">
											<Input
												className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
												{...field}
												placeholder="A picture of a horse in Swiss alps"
												disabled={isLoading}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<Button
								className="col-span-12 lg:col-span-2 w-auto ml-auto"
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
						<div className="p-12">
							<Loader />
						</div>
					)}
					{!image && !isLoading && <Empty label="No image generations yet" />}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
						{image && (
							<Card className="rounded-lg overflow-hidden">
								<div className="relative aspect-square">
									<Image
										src={image}
										alt="Generated image"
										fill
										objectFit="cover"
									/>
								</div>
								<CardFooter className="p-2">
									<Button
										onClick={() => window.open(image!)}
										variant="secondary"
										className="w-full"
									>
										<Download className="w-4 h-4 mr-2" />
										Download
									</Button>
								</CardFooter>
							</Card>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
