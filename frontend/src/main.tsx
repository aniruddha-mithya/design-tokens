import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = (
  import.meta as unknown as { env: { VITE_API_URL: string } }
).env.VITE_API_URL;

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
