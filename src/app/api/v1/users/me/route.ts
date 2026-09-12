import { connectToDB } from "@/dbconfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(request: NextRequest) {
	try {
		const userId = await getDataFromToken(request);
		const user = await User.findOne({ _id: userId }).select("-password");
		return NextResponse.json(
			{
				data: user,
				message: "User data fetched successfully",
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error fetching user data:", error);
		return new Response(
			JSON.stringify({
				error: "An error occurred while fetching user data",
			}),
			{ status: 500 },
		);
	}
}
