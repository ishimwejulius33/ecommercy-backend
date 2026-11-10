
export const mailConfig = {
    apiUrl: "https://api.brevo.com/v3/smtp/email",
    apiKey: process.env.BREVO_API_KEY,
    fromEmail: process.env.EMAIL_FROM,
    fromName: process.env.EMAIL_FROM_NAME || "NOVA-TEACH App",
}
