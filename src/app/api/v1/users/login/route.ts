import { connectToDB } from "@/dbconfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDB();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { email, password } = reqBody;

		if (!email || !password) {
			return NextResponse.json(
				{ error: "Please provide all required fields" },
				{ status: 400 },
			);
		}
		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 },
			);
		}

		const validPassword = await bcrypt.compare(
			password,
			existingUser.password,
		);

		if (!validPassword) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 },
			);
		}

		const tokenData = {
			id: existingUser._id,
			email: existingUser.email,
		};
		const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
			expiresIn: "1h",
		});
		const response = NextResponse.json({
			message: "User logged in successfully",
			userId: existingUser._id.toString(),
			email: existingUser.email,
			username: existingUser.username,
		});
		response.cookies.set("token", token, {
			httpOnly: true,
		});
		return response;
	} catch (error) {
		return NextResponse.json(
			{ error: "An error occurred while logging in the user" },
			{ status: 500 },
		);
	}
}
