import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/index";
import SigninPage from "./pages/signin";
import Center from "./pages/center";
import ClientProfilePage from "./pages/clientprofile";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Landing}></Route>
                <Route exact path="/signin" component={SigninPage}></Route>
                <Route exact path="/center" component={Center}></Route>
                <Route exact path="/profile" component={ClientProfilePage}></Route>
            </Switch>
        </Router>
    );


    }
export default App;
