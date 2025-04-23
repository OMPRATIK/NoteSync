import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import { ConvexClientProvider } from "./components/ConvexClientProvider.tsx";
import ThemeProvider from "./components/Themes/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <NuqsAdapter>
        <ConvexClientProvider>
          <App />
        </ConvexClientProvider>
      </NuqsAdapter>
    </ThemeProvider>
  </StrictMode>
);
