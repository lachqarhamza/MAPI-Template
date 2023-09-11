import { isEmptyObject, isObject } from '../validators'

export default function prepareProdErrors(errors) {
	let result = null
	let found = false

	if (!isObject(errors) || isEmptyObject(errors)) return null

	Object.entries(errors).forEach(([_, error]) => {
		if (!found)
			if (error.errorCode) {
				result = error.errorCode
				found = true
			}
	})

	return result
}
