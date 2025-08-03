import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
