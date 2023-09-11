import { jwtAgent } from '../helpers'
import config from '../config'

export default function (req, res, next) {
	const token = req.headers.authorization?.split(' ')[1]
	let { success, payload } = jwtAgent.verify({ token })

	if (success) {
		req['meta'] = { userId: payload.id, role: payload.role }
		next()
	} else {
		res.status(401).json({
			success,
			message: config.ERROR_MESSAGES.UNAUTHORIZED,
			errorCode: config.ERROR_CODES.UNAUTHORIZED,
		})
	}
}
