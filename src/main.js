import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "./styles/main.css";
import { App } from "./App.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(React.createElement(StrictMode, null, React.createElement(App)));
