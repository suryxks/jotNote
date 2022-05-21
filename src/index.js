import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { AuthProvider } from "./contexts/auth-context";
import { ModalProvider } from "./contexts/ModalContext";
import { DataProvider } from "./contexts/DataContext";
import { TagsProvider } from "./contexts/TagsContext";
import { BrowserRouter as Router } from 'react-router-dom'
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <DataProvider>
          <TagsProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </TagsProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
