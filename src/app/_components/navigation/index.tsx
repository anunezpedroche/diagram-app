import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { deleteCookie } from '~/lib/session';
import { decrypt } from '~/lib/token-management';
import { Session } from '~/modules/users/domain/session';
import { FaPowerOff } from 'react-icons/fa6';

const NAV_ITEMS = [
	{
		path: '/diagrams',
		label: 'Diagrams',
	},
];

export default async function NavigationMenu() {
	const user = await decrypt<Session>(cookies().get('session')?.value ?? '');

	const handleLogout = async () => {
		'use server';
		deleteCookie();
		redirect('/login');
	};

	return user ? (
		<nav className="flex justify-between w-full border-b">
			<div className="container flex justify-between">
				<div>
					{NAV_ITEMS.map(item => {
						return (
							<Button key={item.path} variant={'link'}>
								<Link href={'/diagrams'}>{item.label}</Link>
							</Button>
						);
					})}
				</div>
				<form action={handleLogout} className="flex gap-x-3">
					<p className="h-full content-center">Hello, {user?.username}</p>
					<Button variant={'link'} type="submit">
						<FaPowerOff />
					</Button>
				</form>
			</div>
		</nav>
	) : (
		<></>
	);
}
