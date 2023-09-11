import prepareProdErrors from '.'

describe('prepare prod errors', () => {
	it('should parse errors successfully and return the first errorCode found', () => {
		let desiredErrorCode = 'desired error code'

		let errors = {
			prop1: {
				message: 'test error message with code  to be extracted',
			},
			prop2: {
				message: 'followed by an error message',
				errorCode: desiredErrorCode,
			},
			prop3: {
				message: 'error message ended by an error code named',
				errorCode: 'error-code 2',
			},
		}

		let result = prepareProdErrors(errors)

		expect(result).toEqual(desiredErrorCode)
	})
})
