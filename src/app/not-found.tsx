import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans px-4">
			<div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-sm border border-zinc-200/80 text-center">
				<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 font-semibold border border-red-100">
					404
				</div>

				<div className="space-y-2">
					<h1 className="text-2xl font-bold tracking-tight text-zinc-900">
						Page not found
					</h1>
					<p className="text-sm text-zinc-500">
						Sorry, we couldn’t find the page you’re looking for. It
						might have been moved or deleted.
					</p>
				</div>

				<div className="pt-2">
					<Link
						href="/"
						className="block w-full text-center rounded-lg bg-black py-2.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-[0.98]"
					>
						Back to Home
					</Link>
				</div>
			</div>
		</div>
	);
}
