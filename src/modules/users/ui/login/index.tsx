import { redirect } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { login } from '~/lib/session';
import Link from 'next/link';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';

interface ILogin {
	error: boolean;
}

export default async function Login({ error }: ILogin) {
	async function submit(formData: FormData) {
		'use server';
		const user = await login(formData);
		if (user?.id) {
			redirect('/diagrams');
		} else {
			redirect('/login?error=true');
		}
	}

	return (
		<Card className="w-2/3 h-fit m-auto">
			<CardHeader>
				<CardTitle className="text-center text-2xl">Login</CardTitle>
			</CardHeader>
			<CardContent>
				<form action={submit} className="flex flex-col gap-y-3">
					<Label>Username</Label>
					<Input name="username" placeholder="Username" />
					<Label>Password</Label>
					<Input name="password" placeholder="Password" type="password" />
					<Label className="h-6 text-red-500 text-center content-center">
						{error && 'Invalid credentials'}
					</Label>
					<Button type="submit">Login</Button>
				</form>
			</CardContent>
			<CardFooter>
				<Button variant={'link'} className="px-0 py-6">
					<Link href={'/signup'}>No registered yet? Sign up!</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
