import { BrevoClient } from "@getbrevo/brevo";

export const brevoconfig = new BrevoClient({
    apiKey:process.env.BREVOAPIKEY as string,
})