import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Fontul Poppins, instalat local (merge și fără internet)
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/800.css";
import "./App.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
