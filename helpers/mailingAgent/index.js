import makeSmtpAgent from './makeSmtpAgent'
import codeGenerator from '../code-generator'
import { emailVerification, resetPassword, changePassword } from './templates'

// microsoft credentials
// const credentials = {
//   tenantId: process.env.TENANT_ID,
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   objectId: process.env.OBJECT_ID
// }

const sendForgotPasswordCode = makeSmtpAgent({
	codeGenerator,
	html: resetPassword,
	from: 'lma39ol',
	subject: 'Password recovery verification code',
})
const sendEmailVerificationCode = makeSmtpAgent({
	codeGenerator,
	html: emailVerification,
	from: 'lma39ol',
	subject: 'Email verification code',
})
const sendChangePasswordCode = makeSmtpAgent({
	codeGenerator,
	html: changePassword,
	from: 'lma39ol',
	subject: 'Password change code',
})

export default Object.freeze({
	sendForgotPasswordCode,
	sendEmailVerificationCode,
	sendChangePasswordCode,
})
