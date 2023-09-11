import config from '../../config'

export default function makeJwtAgent({ jwt }) {
	let result = {
		success: false,
		statusCode: 500,
		message: config.ERROR_MESSAGES.defaultInternalError,
	}

	return Object.freeze({ sign, verify })

	function sign({ payload }) {
		if (!payload) {
			// LOG needed
			return {
				...result,
				message: config.ERROR_MESSAGES.fieldRequiredError('payload'),
			}
		}
		try {
			let token = jwt.sign(payload, config.JWT.key, {
				expiresIn: config.JWT.experation,
			})
			return { success: true, token }
		} catch (error) {
			// LOG error
			return result
		}
	}

	function verify({ token }) {
		if (!token) {
			// LOG needed
			return {
				...result,
				message: config.ERROR_MESSAGES.fieldRequiredError('token'),
			}
		}
		try {
			const decodedToken = jwt.verify(token, config.JWT.key)
			return {
				success: true,
				payload: decodedToken,
			}
		} catch (error) {
			// LOG needed
			return {
				...result,
				statusCode: 401,
				message: config.ERROR_MESSAGES.unauthorized,
			}
		}
	}
}
