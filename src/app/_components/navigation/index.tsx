import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { deleteCookie } from '~/lib/session';
import { decrypt } from '~/lib/token-management';

const NAV_ITEMS = [
	{
		path: '/diagrams',
		label: 'Diagrams',
	},
];

export default async function NavigationMenu() {
	const user = await decrypt(cookies().get('session')?.value ?? '');

	const handleLogout = async () => {
		'use server';
		deleteCookie();
		redirect('/login');
	};

	return user ? (
		<nav className="flex justify-between w-full border-b">
			<div>
				{NAV_ITEMS.map(item => {
					return (
						<Button key={item.path} variant={'link'}>
							{item.label}
						</Button>
					);
				})}
			</div>
			<form action={handleLogout}>
				<Button type="submit">Logout</Button>
			</form>
		</nav>
	) : (
		<></>
	);
}
