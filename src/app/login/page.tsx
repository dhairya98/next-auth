"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
	const router = useRouter();

	const [user, setUser] = React.useState({
		email: "",
		password: "",
	});

	const [loading, setLoading] = React.useState(false);

	const onLogin = async () => {
		if (!user.email || !user.password) {
			toast.error("Please enter both email and password");
			return;
		}

		try {
			setLoading(true);
			const response = await axios.post("/api/v1/users/login", user);
			const userId = response.data.userId;
			toast.success("Login successful!");
			console.log("Response", response);
			localStorage.setItem(
				"userProfile",
				JSON.stringify({
					email: response.data.email,
					username: response.data.username,
					userId: response.data.userId,
				}),
			);
			router.push(`profile/${userId}`);
		} catch (error: any) {
			toast.error(error.response?.data?.error || "Login failed");
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans px-4">
			<Toaster position="top-center" reverseOrder={false} />

			<div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-sm border border-zinc-200/80">
				<div className="space-y-2 text-center">
					<h1 className="text-3xl font-bold tracking-tight text-zinc-900">
						Welcome Back
					</h1>
					<p className="text-sm text-zinc-500">
						Enter your account details to log in
					</p>
				</div>

				<div className="space-y-4">
					<div className="space-y-1">
						<label className="text-xs font-medium text-zinc-600">
							Username/Email
						</label>
						<input
							type="email"
							placeholder="you@example.com"
							value={user.email}
							onChange={(e) =>
								setUser({ ...user, email: e.target.value })
							}
							className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
						/>
					</div>

					<div className="space-y-1">
						<label className="text-xs font-medium text-zinc-600">
							Password
						</label>
						<input
							type="password"
							placeholder="••••••••"
							value={user.password}
							onChange={(e) =>
								setUser({ ...user, password: e.target.value })
							}
							className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
						/>
					</div>
				</div>

				<div className="space-y-4 pt-2">
					<button
						onClick={onLogin}
						disabled={loading}
						className="w-full rounded-lg bg-black py-2.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:bg-zinc-400 disabled:pointer-events-none"
					>
						{loading ? "Verifying..." : "Log in"}
					</button>

					<div className="text-center">
						<Link
							href="/signup"
							className="text-xs font-medium text-zinc-500 hover:text-black hover:underline transition-colors"
						>
							Don't have an account? Sign up here
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
