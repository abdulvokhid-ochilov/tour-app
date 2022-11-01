import nodemailer from 'nodemailer';

export default async function email(userEmail, pwdResetUrl) {
	let transport;
	if (process.env.NODE_ENV === 'development') {
		transport = {
			host: process.env.MAILTRAP_HOST,
			port: process.env.MAILTRAP_PORT,
			// secure: false,
			auth: {
				user: process.env.MAILTRAP_USER,
				pass: process.env.MAILTRAP_PASS,
			},
		};
	} else if (process.env.NODE_ENV === 'production') {
		transport = {
			host: process.env.MAILTRAP_HOST,
			port: process.env.MAILTRAP_PORT,
			secure: false,
			auth: {
				user: process.env.MAILTRAP_USER,
				pass: process.env.MAILTRAP_PASS,
			},
		};
	}
	const message = `<p>Click here <a href="${pwdResetUrl}">Reset Password</a> to reset your password.</p>\n<p>The link will expire after 10 minutes.</p>\n<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;
	const mailOptions = {
		from: `${process.env.APP_NAME} <${process.env.EMAIL}>`,
		to: userEmail,
		subject: 'Password reset',
		html: message,
	};
	let transporter = nodemailer.createTransport(transport);
	return await transporter.sendMail(mailOptions);
}
