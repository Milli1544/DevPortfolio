// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://dev-portfolio-ajsa.vercel.app"
    : "http://localhost:5000");

export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNIN: `${API_BASE_URL}/api/auth/signin`,
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  SIGNOUT: `${API_BASE_URL}/api/auth/signout`,

  // Data endpoints
  PROJECTS: `${API_BASE_URL}/api/projects`,
  QUALIFICATIONS: `${API_BASE_URL}/api/qualifications`,
  CONTACTS: `${API_BASE_URL}/api/contacts`,
  USERS: `${API_BASE_URL}/api/users`,

  // Health check
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL;
