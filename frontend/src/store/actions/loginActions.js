import Axios from "axios";
import cookie from "react-cookies";
import Server from "../../webConfig";
import swal from "sweetalert";
import { Redirect } from "react-router-dom";
export const logIn = (credentials) => {
    Axios.defaults.withCredentials = true;
    return (dispatch, getState) => {
        if (credentials.accountType === "Client") {
            console.log("Inside client login", credentials);
            Axios.post(`${Server}/users/login`, {
                email: credentials.email,
                password: credentials.password,
            })
                .then((response) => {
                    console.log(response.status);
                    if (response.status === 200) {
                        dispatch({
                            type: "LOGIN_SUCCESS",
                            payload: response.data,
                        });
                    }
                    if (response.status === 201) {
                        swal(
                            "Opps!",
                            "Incorrect Username or Password",
                            "error"
                        );
                        dispatch({ type: "LOGIN_NOT_SUCCESS" });
                    }
                })
                .catch((err) => {
                    swal(
                        "Opps!",
                        "Something went wrong. Please try again",
                        "error"
                    );
                    dispatch({ type: "LOGIN_ERROR", err });
                });
        } else if (credentials.accountType === "Lawyer") {
            console.log("Inside lawyer login", credentials);
            Axios.post(`${Server}/lawyers/login`, {
                email: credentials.email,
                password: credentials.password,
            })
                .then((response) => {
                    console.log(response.status);
                    if (response.status === 200) {
                        dispatch({
                            type: "LOGIN_SUCCESS",
                            payload: response.data,
                        });
                    }
                    if (response.status === 201) {
                        swal(
                            "Opps!",
                            "Incorrect Username or Password",
                            "error"
                        );
                        dispatch({ type: "LOGIN_NOT_SUCCESS" });
                    }
                })
                .catch((err) => {
                    swal(
                        "Opps!",
                        "Something went wrong. Please try again",
                        "error"
                    );
                    dispatch({ type: "LOGIN_ERROR", err });
                });
        }
    };
};

export const signOut = () => {
    window.localStorage.clear();
    return (dispatch, getState) => {
        // Axios.get(`${backServer}/logout`).then((response) => {
        // if (response.status === 200) {
        localStorage.clear();
        cookie.remove("cookie", { path: "/" });
        dispatch({ type: "SIGNOUT_SUCCESS" });
        <Redirect to="/signin" />;
        // }
        // });
    };
};

export const signUp = (newAccount) => {
    // console.log("newacoount", newAccount);
    Axios.defaults.withCredentials = true;
    return (dispatch, getState) => {
        if (newAccount.accountType === "Client") {
            console.log("Inside client newacoount", newAccount);
            Axios.post(`${Server}/users/signup`, {
                name: newAccount.name,
                email: newAccount.email,
                password: newAccount.password,
            })
                .then((response) => {
                    console.log("Response from db ");
                    console.log(response);
                    if (response.status === 200) {
                        // console.log(response.data[0].name);
                        dispatch({
                            type: "SIGNUP_SUCCESS",
                            payload: response.data,
                        });
                    }
                })
                .catch((err) => {
                    console.log("error signup user", err);
                    dispatch({ type: "SIGNUP_FAILED", err });
                });
        } else if (newAccount.accountType === "Lawyer") {
            console.log("Inside lawyer newacoount", newAccount);
            Axios.post(`${Server}/lawyers/signup`, {
                name: newAccount.name,
                email: newAccount.email,
                password: newAccount.password,
            })
                .then((response) => {
                    console.log("Response from db ");
                    console.log(response);
                    if (response.status === 200) {
                        //console.log(response.data[0].name);
                        dispatch({
                            type: "SIGNUP_SUCCESS",
                            payload: response.data,
                        });
                    }
                })
                .catch((err) => {
                    console.log("error signup lawyer", err);
                    dispatch({ type: "SIGNUP_FAILED", err });
                });
        }
    };
};
