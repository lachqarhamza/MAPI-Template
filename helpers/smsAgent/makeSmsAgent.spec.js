import smsAgent from '.'
import codeGenerator from '../codeGenerator'

describe('sms agent', () => {
	const validPhone = '+212766914847'
	const code = codeGenerator.generate()

	it('returns phone is required error', async () => {
		const result = await smsAgent.send({})

		//console.log(result);

		expect(result).toHaveProperty('success', false)
		expect(result).toHaveProperty('statusCode', 500)
	})

	it('sends a given code', async () => {
		const result = await smsAgent.send({
			code,
			phone: validPhone,
		})

		// console.log(result);

		expect(result).toHaveProperty('success', true)
		expect(result).toHaveProperty('code')
	})

	it('generates and sends a code', async () => {
		const result = await smsAgent.send({
			phone: validPhone,
		})

		expect(result).toHaveProperty('success', true)
		expect(result).toHaveProperty('code')
	})
})
