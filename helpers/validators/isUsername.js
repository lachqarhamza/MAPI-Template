export default function isUsername(username) {
  return /^[a-z]{1}[A-Za-z0-9]{5,9}$/.test(username);
}
