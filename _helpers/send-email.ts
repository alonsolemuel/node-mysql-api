import nodemailer from 'nodemailer';
import config from '../config';

let testTransporter: any = null;

export default async function sendEmail({ to, subject, html, from = config.emailFrom }: any) {
    let transporter;
    if (config.smtpOptions.host && config.smtpOptions.auth.user) {
        transporter = nodemailer.createTransport(config.smtpOptions);
    } else {
        // no SMTP configured: use a free Ethereal test inbox and log a preview link
        if (!testTransporter) {
            const account = await nodemailer.createTestAccount();
            testTransporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: { user: account.user, pass: account.pass }
            });
        }
        transporter = testTransporter;
    }
    const info = await transporter.sendMail({ from, to, subject, html });
    const preview = nodemailer.getTestMessageUrl(info);
    if (preview) console.log('Email preview: ' + preview);
}
