export default function isObject(obj) {
  return obj && Object.getPrototypeOf(obj) === Object.prototype;
}
