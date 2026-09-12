"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface UserProfile {
	name: string;
	username: string;
}

const UserProfilePage = () => {
	const router = useRouter();
	const params = useParams();
	const { id } = params;

	const [data, setData] = React.useState<UserProfile | null>(null);
	const [loading, setLoading] = React.useState<boolean>(true);

	React.useEffect(() => {}, [id]);

	const onLogout = async () => {};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans px-4">
			<Toaster position="top-center" reverseOrder={false} />

			<div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-sm border border-zinc-200/80">
				<div className="flex flex-col items-center space-y-3 text-center border-b border-zinc-100 pb-5">
					<div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-xl font-bold text-white shadow-inner">
						{loading
							? "..."
							: data?.name?.charAt(0).toUpperCase() || "U"}
					</div>
					<div className="space-y-1">
						<h1 className="text-2xl font-bold tracking-tight text-zinc-900">
							{loading ? "Loading..." : `${data?.name}'s Profile`}
						</h1>
						<p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
							User Profile Page
						</p>
					</div>
				</div>

				<div className="space-y-4">
					{loading ? (
						<div className="space-y-3 animate-pulse py-2">
							<div className="h-10 bg-zinc-100 rounded-lg w-full" />
							<div className="h-10 bg-zinc-100 rounded-lg w-full" />
						</div>
					) : (
						<div className="space-y-3">
							<div className="flex items-center justify-between rounded-xl bg-zinc-50/70 border border-zinc-100 px-4 py-3 text-sm">
								<span className="font-medium text-zinc-500">
									Full Name
								</span>
								<span className="font-semibold text-zinc-900">
									{data?.name || "N/A"}
								</span>
							</div>

							<div className="flex items-center justify-between rounded-xl bg-zinc-50/70 border border-zinc-100 px-4 py-3 text-sm">
								<span className="font-medium text-zinc-500">
									Username
								</span>
								<span className="font-semibold text-zinc-900">
									@{data?.username || "username"}
								</span>
							</div>

							{/* 3. Displaying the exact dynamic ID grabbed from your [id] folder URL layout */}
							<div className="flex items-center justify-between rounded-xl bg-zinc-50/70 border border-zinc-100 px-4 py-3 text-sm">
								<span className="font-medium text-zinc-500">
									URL Dynamic ID
								</span>
								<span className="font-mono text-xs text-black bg-emerald-100/70 border border-emerald-200 rounded px-1.5 py-0.5 shadow-2xs font-semibold">
									{id}
								</span>
							</div>
						</div>
					)}
				</div>

				<div className="pt-2">
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
};

export default UserProfilePage;
