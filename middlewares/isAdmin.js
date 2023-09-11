import config from '../config'

export default function (req, res, next) {
	if (req.meta.role !== 'admin') {
		res.status(405).json({
			success: false,
			message: config.ERROR_MESSAGES.actionNotAllowed('u should be an admin'),
		})
	} else {
		next()
	}
}
