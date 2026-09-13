import { connectToDB } from "@/dbconfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { token } = reqBody;

		if (!token) {
			return new Response(
				JSON.stringify({ error: "Token is required" }),
				{ status: 400 },
			);
		}
		// finding user by token we capture from url
		const user = await User.findOne({
			verifyToken: token,
			verifyTokenExpiry: { $gt: Date.now() },
		});
		if (!user) {
			return new Response(
				JSON.stringify({ error: "Invalid or expired token" }),
				{ status: 400 },
			);
		}
		// form payload to update in mongo
		user.isVerified = true;
		user.verifyToken = undefined;
		user.verifyTokenExpiry = undefined;
		// shoot save
		const savedUser = await user.save();

		return NextResponse.json(
			{
				message: "Email verified successfully",
				success: true,
			},
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{
				error: "An error occurred while verifying the email",
			},
			{ status: 500 },
		);
	}
}
