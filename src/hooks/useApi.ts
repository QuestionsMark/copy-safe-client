import { useCallback, useState } from "react";
import { API_URL } from "../../config/config";

export const endpoints = {
	async share(text: string) {
		const res = await fetch(`${API_URL}/share`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text }),
		});

		if (!res.ok) {
			throw new Error(`Backend returned ${res.status}`);
		}

		const resJson = await res.json();

		await navigator.clipboard.writeText(resJson.url);

		return resJson;
	},

	async getShare(id: string) {
		const res = await fetch(`${API_URL}/share/${id}`, {
			method: "GET",
		});
		if (!res.ok) {
			throw new Error(`Backend returned ${res.status}`);
		}

		const resJson = (await res.json()) as { text: string };

		await navigator.clipboard.writeText(resJson.text);

		return resJson;
	},
};

type AsyncFn<Args extends any[] = any[], R = any> = (...args: Args) => Promise<R>;

export const useApi = <Args extends any[] = any[], R = any>(fn: AsyncFn<Args, R>) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const run = useCallback(
		async (...args: Args): Promise<{ data: R | null; error: string | null }> => {
			setError(null);
			setLoading(true);

			let data: R | null = null;
			let localError: string | null = null;

			try {
				data = await fn(...args);
			} catch (err: any) {
				localError = err?.message || "Unknown API error";
				setError(localError);
			} finally {
				setLoading(false);
			}

			return { data, error: localError };
		},
		[fn],
	);

	return {
		run,
		loading,
		error,
	} as const;
};
