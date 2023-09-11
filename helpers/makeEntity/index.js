/**
 * @description accepts a mongoose model and entity data
 * @returns an object:
 *    in case of success contains:
 *      entity: object containing entity data
 *      succes: true
 *    in case of failure contains:
 *      success: false
 *      statusCode: 400 if client error
 *                  500 if there is no params (means dev error)
 *      errors object
 */

import parseErrors from './parseErrors'
import { isEmptyObject } from '../validators'

export default function ({ model, entityData } = {}) {
	let error = {}
	let entity

	if (!model)
		return {
			success: false,
			statusCode: 500,
			message: 'model is required',
		}
	if (!entityData)
		return {
			success: false,
			statusCode: 500,
			message: 'entityData is required',
		}

	entity = new model(entityData)
	error = entity.validateSync()
	// if there is no errors
	if (!error || isEmptyObject(error.errors)) {
		// success response returned
		return { success: true, entity: entityData }
	} else {
		return {
			success: false,
			statusCode: 400,
			errors: parseErrors(error.errors),
		}
	}
}
