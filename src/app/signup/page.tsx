"use client";

import Link from "next/link";
import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignupPage = () => {
	const router = useRouter();

	const [user, setUser] = React.useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [loading, setLoading] = React.useState(false);

	const onSignup = async () => {
		if (
			!user.username ||
			!user.email ||
			!user.password ||
			!user.confirmPassword
		) {
			toast.error("Please fill in all fields");
			return;
		}

		if (user.password !== user.confirmPassword) {
			toast.error("Passwords do not match!");
			return;
		}
		const { confirmPassword, ...backendPayload } = user;

		try {
			const response = await axios.post(
				"/api/v1/users/signup",
				backendPayload,
			);
			toast.success("Account created successfully!");
			router.push("/login");
		} catch (error: any) {
			console.error(error);
			toast.error(error.response?.data?.error || "Signup failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans px-4">
			<Toaster position="top-center" reverseOrder={false} />

			<div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-sm border border-zinc-200/80">
				<div className="space-y-2 text-center">
					<h1 className="text-3xl font-bold tracking-tight text-zinc-900">
						Create an account
					</h1>
					<p className="text-sm text-zinc-500">
						Enter your details below to get started
					</p>
				</div>

				<div className="space-y-4">
					<div className="space-y-1">
						<label className="text-xs font-medium text-zinc-600">
							Email
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
							Username
						</label>
						<input
							type="text"
							placeholder="DhairyaAnchalRockStar"
							value={user.username}
							onChange={(e) =>
								setUser({ ...user, username: e.target.value })
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

					<div className="space-y-1">
						<label className="text-xs font-medium text-zinc-600">
							Confirm Password
						</label>
						<input
							type="password"
							placeholder="••••••••"
							value={user.confirmPassword}
							onChange={(e) =>
								setUser({
									...user,
									confirmPassword: e.target.value,
								})
							}
							className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
						/>
					</div>
				</div>

				<div className="space-y-4 pt-2">
					<button
						onClick={onSignup}
						disabled={loading}
						className="w-full rounded-lg bg-black py-2.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:bg-zinc-400 disabled:pointer-events-none"
					>
						{loading ? "Processing..." : "Sign up"}
					</button>

					<div className="text-center">
						<Link
							href="/login"
							className="text-xs font-medium text-zinc-500 hover:text-black hover:underline transition-colors"
						>
							Already have an account? Login here
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignupPage;
