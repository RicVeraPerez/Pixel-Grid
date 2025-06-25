import React from "react";
import { createRoot } from "react-dom/client";
import App from "../../../client/src/App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);

export default App;