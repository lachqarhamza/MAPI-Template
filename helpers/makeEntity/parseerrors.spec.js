import parseErrors from './parseErrors'

describe('', () => {
	it('should parse errors successfully', () => {
		let errors = {
			prop1: {
				message:
					'test error message with code :::error-code::: to be extracted',
			},
			prop2: { message: ':::error-code::: followed by an error message' },
			prop3: {
				message: 'error message ended by an error code named :::error-code:::',
			},
		}
		let expected = {
			prop1: {
				message: 'test error message with code  to be extracted',
				errorCode: 'error-code',
			},
			prop2: {
				message: 'followed by an error message',
				errorCode: 'error-code',
			},
			prop3: {
				message: 'error message ended by an error code named',
				errorCode: 'error-code',
			},
		}

		let result = parseErrors(errors)

		expect(result).toMatchObject(expected)
	})
})
