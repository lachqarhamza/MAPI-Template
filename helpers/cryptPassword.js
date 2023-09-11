import config from '../config'
import bcrypt from 'bcryptjs'

let errorResponse = { success: false, statusCode: 500 }

async function compare({ old, current }) {
	try {
		const isMatch = await bcrypt.compare(current, old)
		if (isMatch) return { success: true }
		return {
			success: false,
			statusCode: 400,
			errors: {
				password: {
					message: config.ERROR_MESSAGES.invalidValueError('password'),
					errorCode: config.ERROR_CODES.INCORRECT_PASSWORD,
				},
			},
		}
	} catch (error) {
		// LOG error needed
		return {
			...errorResponse,
			message: config.ERROR_MESSAGES.defaultInternalError,
			errorCode: config.ERROR_CODES.INTERNAL_ERROR,
		}
	}
}

async function crypt({ password }) {
	if (!password) {
		return {
			...errorResponse,
			message: config.ERROR_MESSAGES.badParamsError('password'),
		}
	}
	try {
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)
		return { success: true, password: hashedPassword }
	} catch (error) {
		// LOG needed: error
		return {
			...errorResponse,
			message: config.ERROR_MESSAGES.defaultInternalError,
			errorCode: config.ERROR_CODES.INTERNAL_ERROR,
		}
	}
}

const cryptPassword = Object.freeze({
	compare,
	crypt,
})

export default cryptPassword
