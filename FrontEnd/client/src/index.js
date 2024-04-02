import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import TheNav from "./component/navbar/TheNav";

ReactDOM.render(
	<React.StrictMode>
			<App />
	</React.StrictMode>,
	document.getElementById("root")
);
