import emailAgent from '.'
import codeGenerator from '../codeGenerator'

describe('email agent', () => {
	const validEmail = 'lachquarhamza@gmail.com'
	const code = codeGenerator.generate()

	describe('sendForgotPasswordCode function', () => {
		it('sends a given code', async () => {
			const result = await emailAgent.sendForgotPasswordCode({
				code,
				to: validEmail,
			})

			// console.log(result);

			expect(result).toHaveProperty('success', true)
			expect(result).toHaveProperty('code')
		})

		it('generates and sends a code', async () => {
			const result = await emailAgent.sendForgotPasswordCode({
				to: validEmail,
			})

			expect(result).toHaveProperty('success', true)
			expect(result).toHaveProperty('code')
		})
	})

	describe('sendEmailVerificationCode function', () => {
		it('sends a given code', async () => {
			const result = await emailAgent.sendEmailVerificationCode({
				code,
				to: validEmail,
			})

			expect(result).toHaveProperty('success', true)
			expect(result).toHaveProperty('code')
		})

		it('generates and sends a code', async () => {
			const result = await emailAgent.sendEmailVerificationCode({
				to: validEmail,
			})

			expect(result).toHaveProperty('success', true)
			expect(result).toHaveProperty('code')
		})
	})

	describe('sendChangePasswordCode function', () => {
		it('sends a given code', async () => {
			const result = await emailAgent.sendChangePasswordCode({
				code,
				to: validEmail,
			})

			expect(result).toHaveProperty('success', true)
			expect(result).toHaveProperty('code')
		})

		it('generates and sends a code', async () => {
			const result = await emailAgent.sendChangePasswordCode({
				to: validEmail,
			})

			expect(result).toHaveProperty('success', true)
			expect(result).toHaveProperty('code')
		})
	})
})
