export default Object.freeze({
	// validation errors
	stringTooShortError: fieldName => `${fieldName} is too short`,
	stringTooLongError: fieldName => `${fieldName} is too long`,
	fieldUniqueError: fieldName =>
		`choose another ${fieldName}, {VALUE} is already used`,
	fieldRequiredError: fieldName => `${fieldName} is required`,
	invalidEmailError: email => `${email} is not a valid email`,
	invalidWebsiteError: website => `${website} is not a valid website`,
	invalidPhoneError: phone => `${phone} is not a valid phone number`,
	invalidCinError: cin => `${cin} is not a valid CIN`,
	invalidEnumValueError: fieldName =>
		`{VALUE} is not supported as ${fieldName}`,
	lessMinDateError: fieldName => `provide a ${fieldName} greater than {VALUE}`,
	greaterMaxDateError: fieldName =>
		`provide a ${fieldName} lesser than {VALUE}`,
	lessMinNumberError: fieldName =>
		`provide a ${fieldName} greater than {VALUE}`,
	greaterMaxNumberError: fieldName =>
		`provide a ${fieldName} lesser than {VALUE}`,
	invalidVerificationCodeError: code =>
		`${code} is not a valid verifiation code`,

	// response errors
	defaultDbError: 'Error occured while comunicating with database',
	badParamsError: paramName => `${paramName} is invalid param`,
	defaultInternalError: 'an internal error occured',
	notFoundError: entityName => `${entityName} not found`,
	fieldNeededError: fieldName => `${fieldName} needed to perform this action`,
	incorrectStatusOrderError: status =>
		`you cannot change the status to ${status}`,
	notVerified: fieldName => `${fieldName} not verified`,
	castUnicityError: error => {
		let result = {}
		Object.entries(error).map(([key, value]) => {
			result[key] = `${value} already used`
		})
		return result
	},
	contactSuportError: 'contact our support to solve the issue',
	UNAUTHORIZED: 'unauthorized !',
	invalidValueError: value => `invalid ${value}`,
	actionNotAllowed: action => `${action}: action not allowed`,
	invalidUsernameError: username => `${username} is invalid username`,
	unicityError: entityName => `${entityName} already exist`,
})
