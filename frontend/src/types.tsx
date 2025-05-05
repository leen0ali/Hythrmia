export type User = {
	user: string;
};

// this can be used to import the environment variable for the base of the API.
export const apiBase = import.meta.env.VITE_API_BASE;