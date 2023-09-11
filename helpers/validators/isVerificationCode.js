export default function isVerificationCode(code) {
  return /^[0-9]{6}$/.test(code);
}
