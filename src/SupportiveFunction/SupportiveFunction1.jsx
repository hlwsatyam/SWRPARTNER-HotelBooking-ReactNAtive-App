export function isGmail(email) {
  // Regular expression to match Gmail addresses
  var gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  // Check if the email matches the Gmail regex
  return gmailRegex.test(email);
}
export function isValidPhoneNumber(number) {
  var indianRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  var internationalRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  return indianRegex.test(number) || internationalRegex.test(number);
}
export function isValidPostalCode(postalCode) {
  // Regular expression to match postal codes
  var postalCodeRegex = /^[a-zA-Z0-9\s]*$/;

  // Check if the postal code matches the regex
  return postalCodeRegex.test(postalCode);
}
export function isValidGoogleMapsLink(link) {
  // Regular expression to match Google Maps URLs
  var googleMapsRegex = /^https:\/\/maps\.app\.goo\.gl\/[\w-]+$/;

  // Check if the link matches the regex
  return googleMapsRegex.test(link);
}
export function isContainsNumber(text) {
  var numberRegex = /^\d+$/;
  return numberRegex.test(text);
}
