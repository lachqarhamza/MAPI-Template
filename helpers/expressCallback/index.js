/**
 * this functon is an adapter stands between express and our code,
 * refactor the request and pass the new one to our controller
 * & receives the response from our controller and give it to express
 */

import prepareResponse from '../prepareResponse'
import config from '../../config'

export default function makeExpressCallback(controller) {
	return async (req, res) => {
		try {
			let httpRequest = {
				meta: req.meta ?? {},
				body: req.body,
				query: req.query,
				params: req.params,
				ip: req.ip,
				method: req.method,
				path: req.path,
				file: req.file,
				headers: {
					'Content-Type': req.get('Content-Type'),
					Referer: req.get('referer'),
					'User-Agent': req.get('User-Agent'),
				},
			}
			let httpResponse = await controller(httpRequest)

			let parsedResponse = prepareResponse(httpResponse)

			if (parsedResponse?.headers) {
				res.set(parsedResponse.headers)
			}
			res.type('json')
			res.status(parsedResponse?.statusCode).send(parsedResponse?.body)
		} catch (e) {
			res.status(500).send({
				httpRequest,
				httpResponse,
				parsedResponse,
				errorCode: config.ERROR_CODES.INTERNAL_ERROR,
				errorSource:
					process.env.NODE_ENV !== 'prod'
						? 'helpers/expressCallback/index.js'
						: undefined,
				errorDetails: process.env.NODE_ENV !== 'prod' ? e : undefined,
				message:
					process.env.NODE_ENV !== 'prod'
						? config.ERROR_MESSAGES.defaultInternalError
						: undefined,
			})
		}
	}
}
