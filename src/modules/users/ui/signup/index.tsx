import { Button } from '~/components/ui/button';
import Link from 'next/link';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/components/ui/card';
import SignupForm from './form/indes';

export default async function Signup() {
	return (
		<Card className="w-2/3 h-fit m-auto">
			<CardHeader>
				<CardTitle className="text-center text-2xl">Signup</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-y-3">
				<SignupForm />
			</CardContent>
			<CardFooter>
				<Button variant={'link'} className="px-0 py-6">
					<Link href={'/login'}>Back to login</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
