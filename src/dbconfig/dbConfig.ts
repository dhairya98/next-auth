import mongoose from "mongoose";

export async function connectToDB() {
	try {
		await mongoose.connect(process.env.MONGO_URL!);
		const connection = mongoose.connection;
		connection.on("connected", () => {
			console.log("MongoDB connected successfully");
		});
		connection.on("error", (err) => {
			console.log("MongoDB connection error:", err);
		});
	} catch (error) {
		console.log(error);
	}
}
