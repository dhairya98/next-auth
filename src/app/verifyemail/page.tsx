"use client";

import React from "react";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function VerifyEmailPage() {
	const [token, setToken] = React.useState("");
	const [verified, setVerified] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		const urlToken = window.location.search.split("=")[1];
		setToken(urlToken || "");
	}, []);

	React.useEffect(() => {
		if (token.length > 0) {
			verifyUserEmail();
		}
	}, [token]);

	const verifyUserEmail = async () => {
		try {
			setLoading(true);
			setError(false);

			await axios.post("/api/v1/users/verifyemail", { token });

			setVerified(true);
			toast.success("Account verified successfully!");
		} catch (error: any) {
			setError(true);
			console.error("Verification error client response logs:", error);
			toast.error(error.response?.data?.error || "Verification failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans px-4">
			<Toaster position="top-center" reverseOrder={false} />

			<div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-sm border border-zinc-200/80 text-center">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold tracking-tight text-zinc-900">
						Account Verification
					</h1>
					<p className="text-sm text-zinc-500">
						Processing your security token parameters
					</p>
				</div>

				<div className="py-4 flex flex-col items-center justify-center">
					{loading && (
						<div className="text-sm text-zinc-600 animate-pulse font-medium">
							Verifying link credentials with database...
						</div>
					)}

					{verified && (
						<div className="space-y-2">
							<div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 font-semibold border border-emerald-100">
								✓
							</div>
							<p className="text-sm font-semibold text-emerald-600">
								Email Verified Successfully!
							</p>
						</div>
					)}

					{error && (
						<div className="space-y-2">
							<div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600 font-semibold border border-red-100">
								✕
							</div>
							<p className="text-sm font-semibold text-red-500">
								Invalid or Expired Token Link
							</p>
						</div>
					)}

					{!token && !loading && (
						<p className="text-xs text-zinc-400 font-mono bg-zinc-50 px-2 py-1 rounded border border-zinc-100">
							No token token string detected in search strings
						</p>
					)}
				</div>

				<div className="pt-2">
					<Link
						href="/login"
						className="flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 active:scale-[0.98]"
					>
						Proceed to Login
					</Link>
				</div>
			</div>
		</div>
	);
}
