import Axios from "axios";
import cookie from "react-cookies";
import Server from "../../webConfig";
import swal from "sweetalert";

export const logIn = (credentials) => {
    Axios.defaults.withCredentials = true;
    return (dispatch, getState) => {
        if (credentials.accountType === "Client") {
            Axios.post(`${Server}/users/login`, {
                email: credentials.email,
                password: credentials.password,
            })
                .then((response) => {
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
            Axios.post(`${Server}/lawyers/login`, {
                email: credentials.email,
                password: credentials.password,
            })
                .then((response) => {
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
        localStorage.clear();
        cookie.remove("cookie", { path: "/" });
        dispatch({ type: "SIGNOUT_SUCCESS" });
    };
};

export const signUp = (newAccount) => {
    Axios.defaults.withCredentials = true;
    return (dispatch, getState) => {
        if (newAccount.accountType === "Client") {
            Axios.post(`${Server}/users/signup`, {
                name: newAccount.name,
                email: newAccount.email,
                password: newAccount.password,
            })
                .then((response) => {
                    if (response.status === 200) {
                        dispatch({
                            type: "SIGNUP_SUCCESS",
                            payload: response.data,
                        });
                    }
                })
                .catch((err) => {
                    dispatch({ type: "SIGNUP_FAILED", err });
                });
        } else if (newAccount.accountType === "Lawyer") {
            Axios.post(`${Server}/lawyers/signup`, {
                name: newAccount.name,
                email: newAccount.email,
                password: newAccount.password,
            })
                .then((response) => {
                    if (response.status === 200) {
                        dispatch({
                            type: "SIGNUP_SUCCESS",
                            payload: response.data,
                        });
                    }
                })
                .catch((err) => {
                    dispatch({ type: "SIGNUP_FAILED", err });
                });
        }
    };
};
