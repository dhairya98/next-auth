"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast, Toaster } from "react-hot-toast";

export default function ProfilePage() {
	const router = useRouter();
	const [data, setData] = React.useState(null);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		getUserDetails();
	}, []);

	const getUserDetails = async () => {
		const res = await axios.get(`/api/v1/users/me`);
		setData(res.data.data._id);
		setLoading(false);
	};

	const onLogout = async () => {
		try {
			setLoading(true);

			await axios.post("/api/v1/users/logout");

			toast.success("Logged out successfully");
			localStorage.removeItem("userProfile");
			router.push("/login");
		} catch (error: any) {
			console.error("Logout Error:", error);
			toast.error("Logout failed");
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans px-4">
			<Toaster position="top-center" reverseOrder={false} />

			<div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-sm border border-zinc-200/80 text-center">
				{/* Top Profile Header Block */}
				<div className="flex flex-col items-center space-y-2 border-b border-zinc-100 pb-5">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white shadow-inner select-none animate-pulse">
						P
					</div>
					<h1 className="text-2xl font-bold tracking-tight text-zinc-900">
						Hello from profile page
					</h1>
				</div>

				<div className="space-y-3 pt-1">
					<Link
						href={`/profile/${data}`}
						className="flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 active:scale-[0.98]"
					>
						My Profile
					</Link>

					<button
						onClick={onLogout}
						disabled={loading}
						className="w-full rounded-lg bg-zinc-100 hover:bg-red-50 text-zinc-700 hover:text-red-600 border border-zinc-200/60 hover:border-red-200 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-50"
					>
						{loading && !data ? "Working..." : "Sign Out"}
					</button>
				</div>
			</div>
		</div>
	);
}
