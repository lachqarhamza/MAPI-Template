import config from '../../config'
import dotenv from 'dotenv'
import { Client } from '@microsoft/microsoft-graph-client'
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials'
import { ClientSecretCredential } from '@azure/identity'
import 'isomorphic-fetch'

dotenv.config()

let errorResponse = {
	success: false,
	statusCode: 500,
	message: config.ERROR_MESSAGES.defaultInternalError,
	errorCode: config.ERROR_CODES.INTERNAL_ERROR,
}

export default function makeMicrosoftEmailAgent({
	credentials,
	codeGenerator,
	html,
	subject,
}) {
	return async function sendVerificationCode({ to, code: verificationCode }) {
		try {
			const credential = new ClientSecretCredential(
				credentials.tenantId,
				credentials.clientId,
				credentials.clientSecret
			)

			const authProvider = new TokenCredentialAuthenticationProvider(
				credential,
				{
					scopes: ['https://graph.microsoft.com/.default'],
				}
			)

			const client = Client.initWithMiddleware({
				debugLogging: true,
				authProvider,
			})

			if (!to) {
				return {
					...errorResponse,
					message: config.ERROR_MESSAGES.fieldRequiredError('destination (to)'),
				}
			}

			if (!verificationCode) verificationCode = codeGenerator.generate()

			const emailContent = {
				message: {
					subject,
					body: {
						contentType: 'html',
						content: html({ code: verificationCode }),
					},
					toRecipients: [
						{
							emailAddress: {
								address: to,
							},
						},
					],
				},
			}

			await client
				.api(`/users/${credentials.objectId}/sendMail`)
				.post(emailContent)

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
