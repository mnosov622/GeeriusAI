'use client';

import BotAvatar from '@/components/bot-avatar';
import Empty from '@/components/empty';
import Heading from '@/components/heading';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import UserAvatar from '@/components/user-avatar';
import { formSchema } from '@/constants';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Code, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChatCompletionMessage } from 'openai/resources/chat/index.mjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ReactMarkDown from 'react-markdown';
import * as z from 'zod';

export default function CodePage() {
	const router = useRouter();
	const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const userMessage: ChatCompletionMessage = {
				role: 'user',
				content: values.prompt,
			};

			const newMessages = [...messages, userMessage];

			const response = await axios.post('/api/code', {
				messages: newMessages,
			});

			setMessages((current) => [...current, userMessage, response.data]);
			form.reset();
		} catch (e) {
			//TODO:Open pro modal
			console.log('Conversation error', e);
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="Code Generation"
				description="Generate code using descriptive text."
				icon={Code}
				iconColor="text-green-700"
				bgColor="bg-green-700/10"
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
												placeholder="Simple toggle button using react hooks."
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
					{messages.length === 0 && !isLoading && <Empty label="No code generations yet" />}
					<div className="flex flex-col reverse gap-y-4 w-[90%]">
						{messages.map((message, index) => (
							<div
								key={index}
								className={cn(
									'p-4 w-full flex items-center gap-x-8 rounded-lg break-all relative',
									message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted'
								)}
							>
								{message.role === 'user' ? <UserAvatar /> : <BotAvatar />}

								{message.role === 'user' ? (
									<div>{message.content}</div>
								) : (
									<>
										{/* <SyntaxHighlighter
										language="javascript"
										style={customStyle}
									>
										{String(message.content)}
									</SyntaxHighlighter> */}

										<ReactMarkDown
											components={{
												pre: ({ node, ...props }) => (
													<div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
														<pre {...props} />
													</div>
												),
												code: ({ node, ...props }) => (
													<code
														className="bg-black/10 rounded-lg p-1"
														{...props}
													/>
												),
											}}
											className="text-sm overflow-hidden"
										>
											{message.content}
										</ReactMarkDown>
										<Copy
											className="w-6 h-6 cursor-pointer absolute top-4 right-4"
											onClick={() => {
												const codeWithoutLanguage = String(message.content).replace(
													/```jsx|```/g,
													''
												);
												navigator.clipboard.writeText(codeWithoutLanguage);
												toast.success('Code copied to clipboard');
											}}
										/>
									</>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
