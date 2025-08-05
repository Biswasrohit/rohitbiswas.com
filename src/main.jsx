import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./styles/style.css";
import "./styles/mediaqueries.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
