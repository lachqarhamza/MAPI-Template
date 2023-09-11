import nodemailer from 'nodemailer'
import config from '../../config'
import dotenv from 'dotenv'

dotenv.config()

export default function makeEmailAgent({ codeGenerator, html, from, subject }) {
	let mailConfig

	if (process.env.NODE_ENV === 'production') {
		// all emails are delivered to destination
		mailConfig = {
			host: process.env.SMTP_MAILING_HOST,
			port: process.env.SMTP_MAILING_PORT,
			secure: false,
			tls: {
				rejectUnauthorized: false,
				minVersion: 'TLSv1.2',
			},
			auth: {
				user: process.env.SMTP_MAILING_USER,
				pass: process.env.SMTP_MAILING_PASS,
			},
		}
	} else {
		// all emails are catched by ethereal.email
		mailConfig = {
			host: process.env.ETHEREAL_HOST,
			port: process.env.ETHEREAL_PORT,
			auth: {
				user: process.env.ETHEREAL_USER,
				pass: process.env.ETHEREAL_PASS,
			},
		}
	}

	let transporter = nodemailer.createTransport(mailConfig)

	let errorResponse = {
		success: false,
		statusCode: 500,
		message: config.ERROR_MESSAGES.defaultInternalError,
		errorCode: config.ERROR_CODES.INTERNAL_ERROR,
	}

	return async function sendVerificationCode({ to, code: verificationCode }) {
		transporter.verify(function (error, _) {
			if (error) {
				return { ...errorResponse, errorDetails: error, test: 'verification' }
			}
		})

		if (!to) {
			return {
				...errorResponse,
				message: config.ERROR_MESSAGES.fieldRequiredError('destination (to)'),
			}
		}

		if (!verificationCode) {
			verificationCode = codeGenerator.generate()
		}

		try {
			await transporter.sendMail({
				from,
				subject,
				to,
				html: html({ code: verificationCode }),
			})
			return {
				success: true,
				code: verificationCode,
			}
		} catch (error) {
			// LOG needed: error
			return { ...errorResponse, errorDetails: error }
		}
	}
}
