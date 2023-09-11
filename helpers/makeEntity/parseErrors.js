import getErrorCode from './getErrorCode'
import reconstructErrorMessage from './reconstructErrorMessage'

export default function parseErrors(error) {
	let errors = {}

	Object.entries(error).forEach(([key, value]) => {
		errors[key] = {
			message: reconstructErrorMessage(value.message),
			errorCode: getErrorCode(value.message),
		}
	})

	return errors
}
