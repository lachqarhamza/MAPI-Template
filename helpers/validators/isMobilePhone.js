import validator from "validator";

export default function isMobilePhone(phone) {
  if (phone === undefined || phone === null) return false;
  return validator.isMobilePhone(phone);
}
