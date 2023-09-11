import validator from "validator";

export default function isEmail(email) {
  return validator.isEmail(email);
}
