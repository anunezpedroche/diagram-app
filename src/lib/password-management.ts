const bcrypt = require('bcrypt');

export async function hashPass(password: string): Promise<string> {
	return await bcrypt.hash(password, 10);
}

export async function checkPass(
	password: string,
	hashPass: string,
): Promise<boolean> {
	return await bcrypt.compare(password, hashPass);
}
