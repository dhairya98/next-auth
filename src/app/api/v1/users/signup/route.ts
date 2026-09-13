import { connectToDB } from "@/dbconfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectToDB();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { username, email, password } = reqBody;

		if (!username || !email || !password) {
			return NextResponse.json(
				{ error: "Please provide all required fields" },
				{ status: 400 },
			);
		}
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return NextResponse.json(
				{ error: "Email already exists" },
				{ status: 400 },
			);
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		await newUser.save();

		sendEmail({
			email: newUser.email,
			emailType: "VERIFY",
			userId: newUser._id,
		});

		return NextResponse.json(
			{
				message: "User signed up successfully",
				success: true,
			},
			{ status: 201 },
		);
	} catch (error) {
		return NextResponse.json(
			{ error: "An error occurred while signing up the user" },
			{ status: 500 },
		);
	}
}
