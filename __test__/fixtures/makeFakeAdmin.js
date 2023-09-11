/**
 * 
 * @param {*} overrides 
 * @returns and admin
 * @description if there is no overrides, it returns the default admin object, otherwise it overrides it
 */

export default function makeFakeAdmin(overrides) {
	const admin = {
		username: 'hlachqar',
		password: 'testPassword',
	}

	return {
		...admin,
		...overrides,
	}
}
