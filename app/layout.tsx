import ChrisProvider from '@/components/crisp-provider';
import ModalProvider from '@/components/modal-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'GenerAI',
	description: 'AI platform',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					{children}

					<ChrisProvider />
					<ModalProvider />
					<Toaster />
					<Analytics />
				</body>
			</html>
		</ClerkProvider>
	);
}
