import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './login.scss';
import axios from "axios";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });

        try {
            const res = await axios.post("/auth/login", {
                email: email.current.value,
                password: password.current.value
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            window.location.replace("/");
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
    };

    console.log(isFetching);
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Email</label>
                <input ref={email} className="loginInput" type="text" placeholder="Enter your email..." />
                <label>Password</label>
                <input required ref={password} className="loginInput" type="password" placeholder="Enter your password..." />
                <button disabled={isFetching} className="loginButton" type="submit">Login</button>
            </form>
            <Link to="/register">
                <button className="loginRegisterButton">Register</button>
            </Link>
        </div>
    )
}
