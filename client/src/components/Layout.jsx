import { useEffect, useState } from "react";

const Layout = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set initial body styles
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";
    document.body.style.background = "#1a1b2e";

    // Mount after a brief delay to ensure proper initialization
    const timer = setTimeout(() => setMounted(true), 100);

    return () => {
      clearTimeout(timer);
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.overflowX = "";
      document.body.style.background = "";
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Background container */}
      {mounted && (
        <>
          {/* Simple gradient background instead of Silk */}
          <div
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: -1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-indigo-900/10 to-transparent" />
          </div>
        </>
      )}

      {/* Content container */}
      <main className="relative flex-grow z-10">
        {/* Content will be rendered here by React Router */}
      </main>
    </div>
  );
};

export default Layout;
