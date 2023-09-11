import getErrorCode from './getErrorCode'

export default function reconstructErrorMessage(errorMessage) {
	if (!errorMessage) return null

	const errorCode = getErrorCode(errorMessage)
	if (!errorCode) return errorMessage

	const errorRemoved = errorMessage.replace(`:::${errorCode}:::`, '')
	return errorRemoved.trim()
}
