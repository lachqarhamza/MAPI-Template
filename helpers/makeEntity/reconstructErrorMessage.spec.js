import reconstructErrorMessage from './reconstructErrorMessage'

describe('make-entity ::: reconstruct error message function', () => {
	it('code in the start ::: should extract the code', () => {
		const errorCode = 'SOME-CODE'
		const testError = `:::${errorCode}::: some other text`

		let result = reconstructErrorMessage(testError)

		expect(result).toEqual('some other text')
	})
	it('code in the middle ::: should extract the code', () => {
		const errorCode = 'SOME-CODE'
		const testError = `some text before the error:::${errorCode}::: some other text`

		let result = reconstructErrorMessage(testError)

		expect(result).toEqual('some text before the error some other text')
	})
	it('code in the end ::: should extract the code', () => {
		const errorCode = 'SOME-CODE'
		const testError = `some other text:::${errorCode}:::`

		let result = reconstructErrorMessage(testError)

		expect(result).toEqual('some other text')
	})
	it('there is no code ::: should return the error message', () => {
		const testError = `some other text`

		let result = reconstructErrorMessage(testError)

		expect(result).toEqual(testError)
	})
})
