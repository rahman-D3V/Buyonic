import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_zg1l9rj";
const TEMPLATE_ID = "template_qvvjjga";
const PUBLIC_KEY = "gGlKlkZ6L4UavdX1s";

export function sendOtpEmail({ to_email, username, otp }) {
  const templateParams = { to_email, username, otp };
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
}
