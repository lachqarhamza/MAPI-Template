const prepare = (simple, str) => (simple ? str : `:::${str}:::`)

export default Object.freeze({
	INTERNAL_ERROR: 'I0000',
	UNAUTHORIZED: 'I0001',
	CONTACT_SUPPORT: 'I0002',
	INVALID_EMAIL: simple => prepare(simple, 'A0000'),
	INVALID_CODE: simple => prepare(simple, 'A0001'),
	INVALID_USERNAME: simple => prepare(simple, 'A0002'),
	UNIQUE_CIN: 'A0003',
	UNIQUE_USERNAME: 'A0004',
	UNIQUE_EMAIL: 'A0005',
	MIN_BIRTHDAY: prepare(false, 'A0006'),
	MAX_BIRTHDAY: prepare(false, 'A0007'),
	UNIQUE_PHONE: 'A0008',
	USER_NOT_FOUND: 'A0009',
	ADD_EXISTING_INACTIVE_RECIVER: 'RC0000',
	PATH_NOT_FOUND: 'P0000',
	INSUFFICIENT_SOLD: 'P0001',
	EDIT_PUBLISHED_PATH: 'P0002',
	INCORRECT_PASSWORD: 'A0010',
	INVALID_WEBSITE: simple => prepare(simple, 'A0011'),
	UNIQUE_WEBSITE: 'A0012',
})
