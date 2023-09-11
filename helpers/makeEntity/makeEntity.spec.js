import mongoose from 'mongoose'
import makeEntity from '.'

describe('makeEntity function', () => {
	let internalError = { success: false, statusCode: 500 }
	let clientError = { success: false, statusCode: 400 }
	const errorCode = ':::error-code:::'
	const cleanErrorCode = 'error-code'

	describe('dev errors', () => {
		it('error -> devError: model is required', () => {
			let result = makeEntity()
			let expected = {
				...internalError,
				message: 'model is required',
			}
			expect(result).toMatchObject(expected)
		})
		it('error -> devError: entityData is required', () => {
			const TestSchema = new mongoose.Schema({})
			const TestModel = mongoose.model('Test', TestSchema)
			let result = makeEntity({ model: TestModel })
			let expected = {
				...internalError,
				message: 'entityData is required',
			}
			expect(result).toMatchObject(expected)
		})
	})

	describe('required validor', () => {
		const TestSchema = new mongoose.Schema({
			feild1: {
				type: String,
				required: [true, `${errorCode}feild1 is required`],
			},
		})
		const TestModel = mongoose.model('Test1', TestSchema)
		it('error -> path is required', () => {
			const result = makeEntity({ model: TestModel, entityData: {} })
			const expected = {
				...clientError,
				errors: {
					feild1: { message: 'feild1 is required', errorCode: cleanErrorCode },
				},
			}

			expect(result).toMatchObject(expected)
		})
		it('pass', () => {
			const result = makeEntity({
				model: TestModel,
				entityData: { feild1: 'feild1' },
			})
			expect(result).toHaveProperty('success', true)
			expect(result).toHaveProperty('entity')
		})
	})

	describe('strings validors', () => {
		const TestSchema = new mongoose.Schema({
			feild1: {
				type: String,
				minLength: [6, `${errorCode}feild1 is too short`],
				maxLength: [20, `${errorCode}feild1 is too long`],
			},
			feild2: {
				type: String,
				enum: {
					values: ['aa', 'bb', 'cc'],
					message: `{VALUE} is not supported${errorCode}`,
				},
			},
		})
		const TestModel = mongoose.model('Test2', TestSchema)
		describe('minLength validor', () => {
			it('error -> path value is too short', () => {
				let result = makeEntity({
					model: TestModel,
					entityData: { feild1: '124' },
				})
				let expected = {
					...clientError,
					errors: {
						feild1: {
							message: 'feild1 is too short',
							errorCode: cleanErrorCode,
						},
					},
				}
				expect(result).toMatchObject(expected)
			})
		})
		describe('maxLength validor', () => {
			it('error -> path value is too long', () => {
				let result = makeEntity({
					model: TestModel,
					entityData: { feild1: '012345678901234567890123456789' },
				})
				let expected = {
					...clientError,
					errors: {
						feild1: {
							message: 'feild1 is too long',
							errorCode: cleanErrorCode,
						},
					},
				}
				expect(result).toMatchObject(expected)
			})
		})
		describe('enum validor', () => {
			it('error -> path value is not in enum', () => {
				let result = makeEntity({
					model: TestModel,
					entityData: { feild2: '77' },
				})
				let expected = {
					...clientError,
					errors: {
						feild2: {
							message: '77 is not supported',
							errorCode: cleanErrorCode,
						},
					},
				}
				expect(result).toMatchObject(expected)
			})
		})
		it('pass', () => {
			let result = makeEntity({
				model: TestModel,
				entityData: { feild1: '1234567', feild2: 'aa' },
			})
			expect(result).toHaveProperty('success', true)
			expect(result).toHaveProperty('entity')
		})
	})

	describe('numbers validors', () => {
		const TestSchema = new mongoose.Schema({
			feild1: {
				type: Number,
				min: [6, `feild1${errorCode} is too small`],
				max: [20, `${errorCode}feild1 is too big`],
			},
		})
		const TestModel = mongoose.model('Test3', TestSchema)
		describe('min validor', () => {
			it('error -> path value is too small', () => {
				let result = makeEntity({
					model: TestModel,
					entityData: { feild1: 2 },
				})
				let expected = {
					...clientError,
					errors: {
						feild1: {
							message: 'feild1 is too small',
							errorCode: cleanErrorCode,
						},
					},
				}
				expect(result).toMatchObject(expected)
			})
		})
		describe('max validor', () => {
			it('error -> path value is too big', () => {
				let result = makeEntity({
					model: TestModel,
					entityData: { feild1: 55 },
				})
				let expected = {
					...clientError,
					errors: {
						feild1: { message: 'feild1 is too big', errorCode: cleanErrorCode },
					},
				}
				expect(result).toMatchObject(expected)
			})
		})
		it('pass', () => {
			let result = makeEntity({
				model: TestModel,
				entityData: { feild1: 8 },
			})
			expect(result).toHaveProperty('success', true)
			expect(result).toHaveProperty('entity')
		})
	})

	describe('dates validators', () => {
		const TestSchema = new mongoose.Schema({
			feild: {
				type: Date,
				min: ['2022-04-01', `${errorCode}feild is too old`],
				max: ['2022-12-31', `${errorCode}feild is too young`],
			},
		})
		const TestModel = mongoose.model('Test4', TestSchema)
		describe('min validatir', () => {
			it('error -> path value is lesser', () => {
				let result = makeEntity({
					model: TestModel,
					entityData: { feild: '2022-02-12' },
				})
				let expected = {
					...clientError,
					errors: {
						feild: { message: 'feild is too old', errorCode: cleanErrorCode },
					},
				}
				expect(result).toMatchObject(expected)
			})
		})
		describe('max validatir', () => {
			it('error -> path value is greater', () => {
				let result = makeEntity({
					model: TestModel,
					entityData: { feild: '2023-01-01' },
				})
				let expected = {
					...clientError,
					errors: {
						feild: { message: 'feild is too young', errorCode: cleanErrorCode },
					},
				}
				expect(result).toMatchObject(expected)
			})
		})
		it('pass', () => {
			let result = makeEntity({
				model: TestModel,
				entityData: { feild: '2022-05-01' },
			})
			expect(result).toHaveProperty('success', true)
			expect(result).toHaveProperty('entity')
		})
	})
})
