import jwtAgent from '.'
import config from '../../config'

describe('jwt agent', () => {
	describe('sign a new token', () => {
		it('returns payload is required as param', () => {
			const result = jwtAgent.sign({})

			//console.log(result);

			let expected = {
				success: false,
				statusCode: 500,
				message: config.ERROR_MESSAGES.fieldRequiredError('payload'),
			}

			expect(result).toMatchObject(expected)
		})

		it('signs a new token successfully', () => {
			const result = jwtAgent.sign({ payload: { id: '1234567890' } })

			//console.log(result);

			expect(result).toHaveProperty('success', true)
			expect(result).toHaveProperty('token')
		})
	})

	describe('verify a token', () => {
		it('return token is required as param', () => {
			const result = jwtAgent.verify({})

			//console.log(result);

			let expected = {
				success: false,
				statusCode: 500,
				message: config.ERROR_MESSAGES.fieldRequiredError('token'),
			}

			expect(result).toMatchObject(expected)
		})

		it('verifies a token successfully', () => {
			const { token } = jwtAgent.sign({ payload: { id: '1234567890' } })
			const result = jwtAgent.verify({ token })

			//console.log(result);

			let expected = {
				success: true,
				payload: { id: '1234567890' },
			}

			expect(result).toMatchObject(expected)
		})

		it('return unauthorized error message', () => {
			const result = jwtAgent.verify({ token: '1478145484458854854848' })

			//console.log(result);

			let expected = {
				success: false,
				statusCode: 401,
				message: config.ERROR_MESSAGES.unauthorized,
			}

			expect(result).toMatchObject(expected)
		})
	})
})
