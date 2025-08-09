// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://dev-portfolio-ajsa.vercel.app" // Production Vercel URL
    : "http://localhost:5000");

// Force the correct API URL in production to prevent CORS issues
const FORCED_API_URL = import.meta.env.PROD
  ? "https://dev-portfolio-ajsa.vercel.app"
  : API_BASE_URL;

// Debug logging
console.log("API Configuration:", {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  PROD: import.meta.env.PROD,
  API_BASE_URL: API_BASE_URL,
  FORCED_API_URL: FORCED_API_URL,
  NODE_ENV: import.meta.env.NODE_ENV,
  CURRENT_ORIGIN: window.location.origin,
});

export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNIN: `${FORCED_API_URL}/api/auth/signin`,
  SIGNUP: `${FORCED_API_URL}/api/auth/signup`,
  SIGNOUT: `${FORCED_API_URL}/api/auth/signout`,

  // Data endpoints
  PROJECTS: `${FORCED_API_URL}/api/projects`,
  QUALIFICATIONS: `${FORCED_API_URL}/api/qualifications`,
  CONTACTS: `${FORCED_API_URL}/api/contacts`,
  USERS: `${FORCED_API_URL}/api/users`,

  // Health check
  HEALTH: `${FORCED_API_URL}/api/health`,
};

export default FORCED_API_URL;
