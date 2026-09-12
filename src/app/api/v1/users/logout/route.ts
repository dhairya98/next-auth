import { connectToDB } from "@/dbconfig/dbConfig";
import { NextResponse } from "next/server";

connectToDB();

export async function POST() {
	try {
		const response = NextResponse.json({
			message: "User logged out successfully",
		});
		response.cookies.set("token", "", {
			httpOnly: true,
		});
		return response;
	} catch (error) {
		return NextResponse.json(
			{ error: "An error occurred while logging out the user" },
			{ status: 500 },
		);
	}
}
