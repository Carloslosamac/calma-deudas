import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { captureUtms } from "./lib/tracking";

// Capture first-touch UTMs from the landing URL before the app renders.
captureUtms();

createRoot(document.getElementById("root")!).render(<App />);
