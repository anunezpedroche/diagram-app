import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { login } from '~/lib/session';

export default async function Login() {
	async function submit(formData: FormData) {
		'use server';
		const user = await login(formData);
		console.log(user);
	}

	return (
		<main className="container">
			<form action={submit}>
				<Label>Username</Label>
				<Input name="username" placeholder="username" />
				<Label>Password</Label>
				<Input name="password" placeholder="password" type="password" />
				<Button type="submit">Login</Button>
			</form>
		</main>
	);
}
