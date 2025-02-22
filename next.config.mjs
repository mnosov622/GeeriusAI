/** @type {import('next').NextConfig} */
const nextConfig = {
	// images: {
	// 	remotePatterns: {
	// 		protocol: 'https',
	// 		hostname: '**',
	// 	},
	// },
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'oaidalleapiprodscus.blob.core.windows.net',
			},
			{
				protocol: 'https',
				hostname: 'replicate.delivery',
			},
		],
	},
};

export default nextConfig;
