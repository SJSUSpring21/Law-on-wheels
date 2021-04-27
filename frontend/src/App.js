import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/index";
import SigninPage from "./pages/signin";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Landing}></Route>
                <Route exact path="/signin" component={SigninPage}></Route>
            </Switch>
        </Router>
    );
}

export default App;
