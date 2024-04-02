import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import TheNav from "./component/navbar/TheNav";

function App() {

	return (
		<Router>
			
		<TheNav/>
		<Routes>
			<Route path="/" exact element={<Main />} />
			{/* <Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} /> */}
		</Routes>
		</Router>
	);
}

export default App;
