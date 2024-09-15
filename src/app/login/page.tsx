import Login from '~/modules/users/ui/login';

interface ILoginPage {
	searchParams: {
		error: boolean;
	};
}

export default async function LoginPage({ searchParams }: ILoginPage) {
	return (
		<main className="container h-full flex">
			<Login error={searchParams.error} />
		</main>
	);
}
