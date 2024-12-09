import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthContextProvider } from "./context/useAuth.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <Router>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools/>
        </QueryClientProvider>
      </Router>
    </AuthContextProvider>
  </StrictMode>
);
