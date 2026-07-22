import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import App from "./App";
import { store } from "./redux/store";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <ThemeProvider>
            <BrowserRouter>
                <App />
                <ToastContainer
                    position="top-right"
                    autoClose={2500}
                    theme="colored"
                />
            </BrowserRouter>
        </ThemeProvider>    
    </Provider>
);