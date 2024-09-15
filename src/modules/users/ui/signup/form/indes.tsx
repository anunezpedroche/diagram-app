'use client';
import { InferrableClientTypes } from '@trpc/server/unstable-core-do-not-import';
import { useRouter } from 'next/navigation';
import { useValidation } from '~/components/hooks/useValidation';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { api } from '~/trpc/react';

const INITIAL_ERRORS_STATE = {
	username: false,
	password: false,
};

export default function SignupForm() {
	const router = useRouter();
	const usersApi = api.users.signup.useMutation({
		onSuccess: () => {
			router.push('/login');
		},
	});

	const { errors, setErrors } = useValidation<
		typeof INITIAL_ERRORS_STATE,
		InferrableClientTypes
	>(INITIAL_ERRORS_STATE, usersApi);

	function signup(formData: FormData) {
		if (!formData.get('username')) {
			return;
		}
		if (!formData.get('password')) {
			return;
		}
		setErrors(INITIAL_ERRORS_STATE);
		const userData = {
			username: formData.get('username') as string,
			password: formData.get('password') as string,
		};
		usersApi.mutate(userData);
	}
	return (
		<form action={signup}>
			<Label>Username</Label>
			<Input name="username" placeholder="Username" />
			<p className="text-red-500 text-xs h-6">
				{errors.username &&
					usersApi.error?.data?.zodError?.fieldErrors['username'] &&
					usersApi.error?.data?.zodError?.fieldErrors['username']}
			</p>
			<Label>Password</Label>
			<Input name="password" placeholder="Password" type="password" />
			<p className="text-red-500 text-xs h-6">
				{errors.password &&
					usersApi.error?.data?.zodError?.fieldErrors['password'] &&
					usersApi.error?.data?.zodError?.fieldErrors['password']}
			</p>
			<Button className="mt-3" type="submit">
				Signup
			</Button>
		</form>
	);
}
