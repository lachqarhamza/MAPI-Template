export default function getErrorCode(str) {
	if (!str) return null

	return str.split(':::')[1] ?? null
}
