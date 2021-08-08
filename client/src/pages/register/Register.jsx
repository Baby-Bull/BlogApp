import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './register.scss';

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const [error, setError] = useState(false);

    const handleRegister = async () => {
        if (password.current.value !== passwordAgain.current.value) {
            passwordAgain.current.value = "";
            passwordAgain.current.setCustomValidity("Doesn't match the entered password");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post("/auth/register", user);
                setError(false);
                window.location.replace("/login");
            } catch (error) {
                setError(true);
            }
        }
    }

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" >
                <label>Username</label>
                <input className="registerInput" type="text" required placeholder="Enter your username..." ref={username} />
                <label>Email</label>
                <input className="registerInput" type="text" required placeholder="Enter your email..." ref={email} />
                <label>Password</label>
                <input className="registerInput" type="password" required placeholder="Enter your password..." ref={password} />
                <label>Password Again</label>
                <input className="registerInput" type="password" required placeholder="Enter password once again" ref={passwordAgain} />
                <button className="registerButton" onClick={handleRegister}>Register</button>
                {error && <p style={{ marginTop: 10, color: "red" }}>User existed or email existed</p>}
            </form>
            <Link to="/login">
                <button className="registerLoginButton">Login</button>
            </Link>
        </div>
    )
}
