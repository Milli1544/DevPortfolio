// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://dev-portfolio-ajsa.vercel.app"
    : "http://localhost:5000");

// Debug logging
console.log("API Configuration:", {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  PROD: import.meta.env.PROD,
  API_BASE_URL: API_BASE_URL,
  NODE_ENV: import.meta.env.NODE_ENV
});

export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNIN: `${API_BASE_URL}/api/auth/signin`,
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  SIGNOUT: `${API_BASE_URL}/api/auth/signout`,

  // Data endpoints
  PROJECTS: `${API_BASE_URL}/api/projects`,
  QUALIFICATIONS: `${API_BASE_URL}/api/qualifications`,
  CONTACTS: `${API_BASE_URL}/api/contact`,
  USERS: `${API_BASE_URL}/api/users`,

  // Health check
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL;
