export default function isPin(pin) {
    return /[0-9]{6}/.test(pin);
  }
  