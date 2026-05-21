const URL: string = import.meta.env.DEV ? "/api" : (import.meta.env.VITE_APP_API_URL || "/api");
export default URL;
