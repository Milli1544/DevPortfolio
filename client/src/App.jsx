import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AdminDashboard from "./components/admin/AdminDashboard";

// Layout component that includes the Navbar
function AppLayout() {
  const [theme, setTheme] = useState("dark");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      // Check for saved theme preference or default to dark
      const savedTheme = localStorage.getItem("theme") || "dark";
      setTheme(savedTheme);

      // Apply theme to document
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (error) {
      console.error("Error setting up theme:", error);
      // Fallback to dark theme
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }

    setIsLoaded(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    try {
      localStorage.setItem("theme", newTheme);
    } catch (error) {
      console.error("Error saving theme to localStorage:", error);
    }

    // Apply theme to document
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Don't render until theme is loaded to prevent flash
  if (!isLoaded) {
    return <div className="min-h-screen bg-white dark:bg-dark-900" />;
  }

  return (
    <div className="App">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Outlet />
    </div>
  );
}

// Create router with future flags for v7 behavior
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "projects", element: <Projects /> },
        { path: "services", element: <Services /> },
        { path: "contact", element: <Contact /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        { path: "admin", element: <AdminDashboard /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
