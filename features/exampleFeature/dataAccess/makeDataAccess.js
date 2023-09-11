export default function makeDataAccess({ makeDb }) {
	return Object.freeze({
		exampleFunction,
	})

	/**
	 * @tested false
	 */
	async function exampleFunction({} = {}) {
		try {
			return { success: true }
		} catch (error) {
			return { success: false }
		}
	}
}
