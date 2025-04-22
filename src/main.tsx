import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import { ConvexClientProvider } from "./components/ConvexClientProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NuqsAdapter>
      <ConvexClientProvider>
        <App />
      </ConvexClientProvider>
    </NuqsAdapter>
  </StrictMode>
);
