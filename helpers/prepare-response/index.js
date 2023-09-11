import makePrepareResponse from "./make-prepare-response";

const prepareReponse = makePrepareResponse({ nodeEnv: process.env.NODE_ENV });

export default prepareReponse;
