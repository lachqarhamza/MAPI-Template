import { ERROR_MESSAGES } from "../../config";

const accountSid =
  process.env.NODE_ENV === "production"
    ? process.env.TWILIO_ACCOUNT_SID
    : process.env.TWILIO_TEST_ACCOUNT_SID;
const authToken =
  process.env.NODE_ENV === "production"
    ? process.env.TWILIO_AUTH_TOKEN
    : process.env.TWILIO_TEST_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

export default function makeSmsAgent({ codeGenerator }) {
  let errorResponse = {
    success: false,
    statusCode: 500,
    message: ERROR_MESSAGES.defaultInternalError,
  };

  return async function send({ phone, code: verificationCode }) {
    if (!phone)
      return {
        ...errorResponse,
        message: ERROR_MESSAGES.fieldRequiredError("phone"),
      };

    if (!verificationCode) {
      verificationCode = codeGenerator.generate();
    }

    try {
      await client.messages.create({
        body: `Your Dim3ak Verification Code: ${verificationCode}`,
        from: process.env.NODE_ENV === "production" ? "Dim3ak" : "+15005550006",
        to: phone,
      });
      return {
        success: true,
        code: verificationCode,
      };
    } catch (error) {
      // LOG needed: error
      return { ...errorResponse, error };
    }
  };
}
