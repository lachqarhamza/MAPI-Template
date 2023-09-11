import prepareProdError from "../prepare-prod-errors";
import { isEmptyObject } from "../validators";

const headers = { "Content-Type": "application/json" };

export default function makePrepareResponse({ nodeEnv }) {
  return function prepareReponse({
    user,
    token,
    added,
    updated,
    deleted,
    found,
    count,
    success,
    statusCode,
    errors,
    errorCode,
    message,
    ...rest
  }) {
    let body = { success };

    if (user) body = { ...body, user };
    if (token) body = { ...body, token };

    if (added) body = { ...body, added };
    if (updated) body = { ...body, updated };
    if (deleted) body = { ...body, deleted };
    if (found) body = { ...body, found };
    if (count) body = { ...body, count };
    if (errorCode) body = { ...body, errorCode };

    const responseObject = {
      headers,
      statusCode: success ? (added ? 201 : 200) : statusCode,
    };

    if (nodeEnv === "dev" || nodeEnv === "test") {
      if (message) body = { ...body, message };
      if (errors) body = { ...body, errors };
      if (!isEmptyObject({ ...rest })) body = { ...body, meta: { ...rest } };
    } else {
      const errorsParsed = prepareProdError(errors);

      if (!errorCode && errorsParsed)
        body = { ...body, errorCode: errorsParsed };
    }

    return { ...responseObject, body };
  };
}
