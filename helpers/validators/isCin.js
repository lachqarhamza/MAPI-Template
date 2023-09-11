export default function isCin(cin) {
  return /^[A-Za-z]{1,2}[0-9]{6}$/.test(cin);
}
