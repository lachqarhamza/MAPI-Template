import isWebsite from './isWebsite'

describe('isWebsite validator', () => {
	it('return true: without protocol and without www', () => {
		expect(isWebsite('msitifa.com')).toEqual(true)
	})
	it('return true: subdomain without protocol and without www', () => {
		expect(isWebsite('laptops.msitifa.com')).toEqual(true)
	})
	it('return true: with http protocol and without www', () => {
		expect(isWebsite('http://msitifa.com')).toEqual(true)
	})
	it('return true: subdomain with http protocol and without www', () => {
		expect(isWebsite('http://laptops.msitifa.com')).toEqual(true)
	})
	it('return true: with https protocol and without www', () => {
		expect(isWebsite('https://msitifa.com')).toEqual(true)
	})
	it('return true: subdomain with https protocol and without www', () => {
		expect(isWebsite('https://laptops.msitifa.com')).toEqual(true)
	})
	it('return false: ends with .', () => {
		expect(isWebsite('https://laptops.msitifa.')).toEqual(false)
	})
	it('return false: contains trailing dots', () => {
		expect(isWebsite('https://laptops..msitifa.com')).toEqual(false)
	})
	it('return false: contains underscore', () => {
		expect(isWebsite('https://laptops_msitifa.com')).toEqual(false)
	})
})
