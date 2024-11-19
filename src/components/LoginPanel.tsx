// import { useState } from 'react';

import TextField from "./common/TextField";
import Button from "./common/Button";
import LoginLogo from "./common/LoginLogo";

import "./LoginPanel.css";
import "../app/shared.css";
import { useAuth } from "../lib/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const emptyUsername = 1 << 0;
const emptyPassword = 1 << 1;

interface LoginPanelProps {
    inactive?: boolean,
}

const LoginPanel = ({ inactive = false }: LoginPanelProps) => {
    const { login } = useAuth();
    const [ statusCode, setStatusCode ] = useState(0);
    const [ error, setError ] = useState(0);
    const navigate = useNavigate();

    const loggingIn = statusCode == 1;
    const loggedIn = statusCode == 200;
    const disableInput = loggingIn || loggedIn;

    let statusElement: JSX.Element = <p key={`${Date.now()}`} className="login-status"></p>;
    if(loggingIn) {
        statusElement = (
            <p key={`${Date.now()}`} className="login-status">
                Verifying your information...
            </p>
        );
    } else if(loggedIn) {
        statusElement = (
            <p key={`${Date.now()}`} className="login-status">
                Log in successful!
            </p>
        );
    } else if(statusCode == 400) {
        statusElement = (
            <p key={`${Date.now()}`} className="login-status error">
                Login failed.
                {/* Login failed.<br/>Your username or password is invalid. */}
            </p>
        );
    } else if(statusCode == 500) {
        statusElement = (
            <p key={`${Date.now()}`} className="login-status error">
                A server error has occurred.
            </p>
        );
    }

    const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        const username = e.currentTarget.elements.namedItem('username') as HTMLInputElement;
        const password = e.currentTarget.elements.namedItem('password') as HTMLInputElement;

        let currentError = 0;
        if(!username.checkValidity()) currentError = currentError | emptyUsername;
        if(!password.checkValidity()) currentError = currentError | emptyPassword;

        if(currentError) {
            setError(currentError);
            return;
        }

        setError(0);
        setStatusCode(1);
        login(username.value, password.value)
            .then(d => {
                if(!d) return;
                if(d.status == 200) {
                    // introduce short delay to show successful login text
                    setTimeout(() => {
                        navigate("/console");
                    }, 1000);
                } else if(d.status == 503) {
                    navigate("/no-service");
                } else {
                    d.status = 400;
                }
                setStatusCode(d.status!);
            })
            .catch(e => { console.error(e); setStatusCode(400) })
    }

    return (
        <div className={`auth-panel login-panel ${inactive ? "inactive" : ""}`}>
            <LoginLogo animated={loggingIn && !loggedIn} size="s" />
            <form onSubmit={submitLogin} noValidate={true}>
                <div className="login-text-fields">
                    <TextField title="Username or Email" disabled={disableInput} name="username" />
                    { (error & emptyUsername) != 0 && <p className="auth-error-msg">Required</p> }
                    <TextField title="Password" type="password" disabled={disableInput} name="password" />
                    { (error & emptyPassword) != 0 && <p className="auth-error-msg">Required</p> }
                </div>
                <Button 
                    text="Log in" 
                    buttonType={3} 
                    disabled={disableInput} 
                    className="auth-submit-btn"
                />
                <p className="auth-panel-nav">
                    Don't have an account yet?
                    <Button 
                        text="Create an account." 
                        buttonType={2} 
                        disabled={disableInput} 
                        className="auth-panel-nav-btn"
                        onClick={(e) => { e.preventDefault(); navigate("/register") }} 
                    />
                </p>
                {statusElement}
            </form>
        </div>
    );
}

export default LoginPanel;