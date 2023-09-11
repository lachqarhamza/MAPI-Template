function generate() {
	return Math.floor(100000 + Math.random() * 900000)
}

export default Object.freeze({ generate })
