import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
	try {
		const hashedToken = await bcrypt.hash(userId.toString(), 10);
		// One goes to DB and one goes to mail, this is case 1
		if (emailType === "VERIFY") {
			await User.findByIdAndUpdate(userId, {
				verifyToken: hashedToken,
				verifyTokenExpiry: Date.now() + 3600000,
			});
		} else if (emailType === "RESET") {
			await User.findByIdAndUpdate(userId, {
				resetToken: hashedToken,
				resetTokenExpiry: Date.now() + 3600000,
			});
		}

		// const token = process.env.NODEMAILERTOKEN_SECRET!;
		const transport = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: "d771624d98260f",
				pass: "8aa8e3786676fc",
			},
		});

		// This is case 2, one goes to email
		const targetUrl =
			emailType === "VERIFY"
				? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
				: `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;

		const emailSubject =
			emailType === "VERIFY"
				? "Verify your email address"
				: "Reset your password";

		const htmlContent = `
			<p>Click <a href="${targetUrl}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>
			<p>Or copy and paste this link into your browser address bar:</p>
			<p>${targetUrl}</p>
		`;

		const mailOptions = {
			from: '"Dhairya Anchal" <dharya.anchal@gmail.com>',
			to: email,
			subject: emailSubject,
			html: htmlContent,
		};

		const mailResponse = await transport.sendMail(mailOptions);
		console.log("Email sent successfully:", mailResponse.messageId);
		return mailResponse;
	} catch (error) {
		console.error("Error sending email:", error);
		throw new Error("Error sending email");
	}
};
