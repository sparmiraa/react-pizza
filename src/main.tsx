import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { AuthModalProvider } from "./context/AuthModalContext";

const rootElem = document.getElementById("root");

if (rootElem) {
  createRoot(rootElem).render(
    // <StrictMode>
    <AuthModalProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </AuthModalProvider>
    // </StrictMode>
  );
}
