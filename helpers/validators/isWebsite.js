export default function isWebsite(website) {
  if (website == null) return false;

  return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,30}(:[0-9]{1,5})?(\/.*)?$/.test(
    website
  );
}
