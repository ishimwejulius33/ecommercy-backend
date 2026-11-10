import { mailConfig } from "../config/mail";
import { welcomeEmailTemplate } from "../templates/welcome.template";

const sendEmail = async (
    to: string,
    subject: string,
    html: string
): Promise<void> => {
    if (!mailConfig.apiKey || !mailConfig.fromEmail) {
        console.error(
            "Error sending email: BREVO_API_KEY or EMAIL_FROM is not set"
        );
        return;
    }

    try {
        const response = await fetch(mailConfig.apiUrl, {
            method: "POST",
            headers: {
                "api-key": mailConfig.apiKey,
                "content-type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify({
                sender: {
                    name: mailConfig.fromName,
                    email: mailConfig.fromEmail,
                },
                to: [{ email: to }],
                subject,
                htmlContent: html,
            }),
        });

        if (!response.ok) {
            console.error(
                "Error sending email:",
                response.status,
                await response.text()
            );
        }
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export const sendResetCodeEmail = async (
    to: string,
    code: string
): Promise<void> => {
    const subject = "Password Reset Code";

    const html = `
        <p>Hello,</p>
        <p>Here is your password reset OTP: ${code}</p>
        <p>This code will expire in 10 minutes.</p>
    `;

    await sendEmail(to, subject, html);
};

export const sendWelcomeEmail = async (
    to: string,
    name: string
): Promise<void> => {
    const subject = "Welcome to NOVA-TEACH App";
    const html = welcomeEmailTemplate(name);

    await sendEmail(to, subject, html);
};