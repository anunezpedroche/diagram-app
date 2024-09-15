import '~/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import { TRPCReactProvider } from '~/trpc/react';
import NavigationMenu from './_components/navigation';

export const metadata: Metadata = {
	title: 'Diagram App',
	description: 'Draw your projects',
	icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${GeistSans.variable}`}>
			<body>
				<TRPCReactProvider>
					<NavigationMenu />
					{children}
				</TRPCReactProvider>
			</body>
		</html>
	);
}
