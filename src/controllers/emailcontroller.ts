import { brevoconfig } from "../config/brevo";

export const sendBrevoMail = async (
  to: string,
  subject: string,
  html: string
): Promise<void> => {
  try {
    await brevoconfig.transactionalEmails.sendTransacEmail({
      sender: {
        name: process.env.BREVO_SENDER_NAME as string,
        email: process.env.BREVO_SENDER_EMAIL as string,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};