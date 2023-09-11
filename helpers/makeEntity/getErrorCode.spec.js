import getErrorCode from './getErrorCode'

describe('make-entity ::: get error code function', () => {
	it('code in the start ::: should extract the code', () => {
		const errorCode = 'SOME-CODE'
		const testError = `:::${errorCode}::: some other text`

		let result = getErrorCode(testError)

		expect(result).toEqual(errorCode)
	})
	it('code in the middle ::: should extract the code', () => {
		const errorCode = 'SOME-CODE'
		const testError = `done text before the error:::${errorCode}::: some other text`

		let result = getErrorCode(testError)

		expect(result).toEqual(errorCode)
	})
	it('code in the end ::: should extract the code', () => {
		const errorCode = 'SOME-CODE'
		const testError = `some other text:::${errorCode}:::`

		let result = getErrorCode(testError)

		expect(result).toEqual(errorCode)
	})
	it('there is no code ::: should return null', () => {
		const testError = `some other text`

		let result = getErrorCode(testError)

		expect(result).toEqual(null)
	})
})
