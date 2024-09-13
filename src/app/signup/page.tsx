import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { api } from '~/trpc/server';
export default async function Signup() {
	async function submit(formData: FormData) {
		'use server';
		const user = {
			username: formData.get('username') as string,
			password: formData.get('password') as string,
		};
		const newUser = await api.users.signup(user);
	}

	return (
		<main className="container">
			<form action={submit}>
				<Label>Username</Label>
				<Input name="username" placeholder="username" />
				<Label>Password</Label>
				<Input name="password" placeholder="password" type="password" />
				<Button type="submit">Create user</Button>
			</form>
		</main>
	);
}
