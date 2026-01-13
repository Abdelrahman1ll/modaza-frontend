import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./components/AuthProvider.tsx";
import { SignupProvider } from "./components/Signup/SignupProvider.tsx";
import GlobalSignup from "./components/Signup/GlobalSignup.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <SignupProvider>
              <App />
              <GlobalSignup />
            </SignupProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
