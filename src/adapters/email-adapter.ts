import nodemailer from "nodemailer";
import { mailOptions } from "../types";

export const emailAdapter = {
    async send(options: mailOptions) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: options.auth
        });
        try {
            await transporter.sendMail({
                from: options.from,
                to: options.to,
                subject: options.subject,
                html: options.html
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}