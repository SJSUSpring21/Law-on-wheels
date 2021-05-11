import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/index";
import SigninPage from "./pages/signin";
import Center from "./pages/center";
//import ClientProfilePage from "./pages/clientprofile";
import Profile from "./pages/profile";
import ServiceRentAgreement from "./pages/rentagreement";
import ServiceMarriageDivorce from "./pages/marriagedivorce";
import Chat from "./components/Chat";
import ChatList from "./components/ChatList";
import ViewProfile from "./pages/viewprofile";
import CaseDetails from "./pages/casedetails";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Landing}></Route>
                <Route exact path="/signin" component={SigninPage}></Route>
                <Route exact path="/center" component={Center}></Route>
                <Route exact path="/profile" component={Profile}></Route>
                <Route
                    exact
                    path="/service/rentagreement"
                    component={ServiceRentAgreement}
                ></Route>
                <Route
                    exact
                    path="/service/marriagedivorce"
                    component={ServiceMarriageDivorce}
                ></Route>
                <Route exact path="/chat" component={Chat} />
                <Route exact path="/chatlist" component={ChatList} />
                <Route
                    exact
                    path="/viewprofile"
                    component={ViewProfile}
                ></Route>
                <Route
                    exact
                    path="/case/:case_id"
                    component={CaseDetails}
                ></Route>
            </Switch>
        </Router>
    );
}
export default App;
