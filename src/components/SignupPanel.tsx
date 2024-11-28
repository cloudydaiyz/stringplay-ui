// import { useState } from 'react';

import TextField from "./common/TextField";
import Button from "./common/Button";
import LoginLogo from "./common/LoginLogo";

import "../app/shared.css";
import "./SignupPanel.css";
import { useState } from "react";
import { useAuth } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import { checkStatus } from "../lib/helper";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const emptyEmail = 1 << 0;
const invalidEmail = 1 << 1;
const emptyUsername = 1 << 2;
const invalidUsername = 1 << 3;
const emptyPassword = 1 << 4;
const invalidPassword = 1 << 5;
const emptyConfirmPassword = 1 << 6;
const invalidConfirmPassword = 1 << 7;

interface SignupPanelProps {
    inactive?: boolean,
}

const SignupPanel = ({ inactive = false }: SignupPanelProps) => {
    const { register } = useAuth();
    const [ statusCode, setStatusCode ] = useState(0);
    const [ error, setError ] = useState(0);
    const navigate = useNavigate();
    
    const signingUp = statusCode == 1;
    const signedUp = checkStatus(statusCode, 200);
    const disableInput = signingUp || signedUp;

    let statusEle: JSX.Element = <p key={`${Date.now()}`} className="signup-status"></p>;
    if(signingUp) {
        statusEle = (
            <p key={`${Date.now()}`} className="signup-status">
                Verifying your information...
            </p>
        );
    } else if(signedUp) {
        statusEle = (
            <p key={`${Date.now()}`} className="signup-status">
                Sign up successful!
            </p>
        );
    } else if(checkStatus(statusCode, 400)) {
        statusEle = (
            <p key={`${Date.now()}`} className="signup-status error">
                Sign up failed.
                {/* Sign up failed.<br/>Username already exists. */}
            </p>
        );
    } else if(checkStatus(statusCode, 500)) {
        statusEle = (
            <p key={`${Date.now()}`} className="signup-status error">
                A server error has occurred.
            </p>
        );
    }

    const submitSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        const email = e.currentTarget.elements.namedItem('email') as HTMLInputElement;
        const username = e.currentTarget.elements.namedItem('username') as HTMLInputElement;
        const password = e.currentTarget.elements.namedItem('password') as HTMLInputElement;
        const confirmPassword = e.currentTarget.elements.namedItem('confirm-password') as HTMLInputElement;
        const inviteCode = e.currentTarget.elements.namedItem('invite-code') as HTMLInputElement;

        let currentError = 0;
        if(!email.checkValidity()) currentError = currentError | emptyEmail;
        else if(!emailRegex.test(email.value)) currentError = currentError | invalidEmail;

        if(!username.checkValidity()) currentError = currentError | emptyUsername;
        else if(username.value.length < 4) currentError = currentError | invalidUsername;

        if(!password.checkValidity()) currentError = currentError | emptyPassword;
        else if(!passwordRegex.test(password.value)) currentError = currentError | invalidPassword;

        if(!confirmPassword.checkValidity()) currentError = currentError | emptyConfirmPassword;
        else if(confirmPassword.value !== password.value) currentError = currentError | invalidConfirmPassword;

        if(currentError) {
            setError(currentError);
            return;
        }

        setError(0);
        setStatusCode(1);
        register(username.value, email.value, password.value, inviteCode.value == "" ? undefined : inviteCode.value)
            .then(d => {
                if(!d || !d.status) {
                    console.log("An error has occurred. Data received:", d);
                    setStatusCode(500);
                    return;
                }

                if(checkStatus(d.status, 200)) {
                    setTimeout(() => {
                        navigate("/login");
                    }, 1000);
                } else if(d.status == 503) {
                    navigate("/no-service");
                }
                setStatusCode(d.status);
            })
            .catch(e => { console.error(e); setStatusCode(400) })
    }

    return (
        <div className={`auth-panel signup-panel ${inactive ? "inactive" : ""}`}>
            <LoginLogo animated={signingUp && !signedUp} size="s" />
            <form onSubmit={submitSignUp} noValidate={true}>
                <div className="signup-text-fields">
                    <TextField title="Email address*" name="email" disabled={disableInput} />
                    { (error & emptyEmail) != 0 && <p className="auth-error-msg">Required</p> }
                    { (error & invalidEmail) != 0 && <p className="auth-error-msg">Invalid email address</p> }
                    <TextField title="New username*" name="username" disabled={disableInput} />
                    { (error & emptyUsername) != 0 && <p className="auth-error-msg">Required</p> }
                    { (error & invalidUsername) != 0 && <p className="auth-error-msg">The username is too short.</p> }
                    <TextField title="New password*" name="password" type="password" disabled={disableInput} />
                    { (error & emptyPassword) != 0 && <p className="auth-error-msg">Please enter your password</p> }
                    { (error & invalidPassword) != 0 && (
                        <p className="auth-error-msg">
                            Must be at least 8 characters with letter and number, no special or non-ASCII characters.
                        </p> 
                    )}
                    <TextField title="Repeat your new password*" name="confirm-password" type="password" disabled={disableInput} />
                    { (error & emptyPassword) != 0 && <p className="auth-error-msg">Please enter your password again</p> }
                    { (error & invalidPassword) != 0 && <p className="auth-error-msg">The passwords you have entered do not match.</p> }
                    <TextField title="Invite code" name="invite-code" disabled={disableInput} />
                </div>
                <Button 
                    text="Sign up" 
                    buttonType={3} 
                    disabled={disableInput} 
                    className="auth-submit-btn"
                />
                <p className="auth-panel-nav">
                    Already have an account?
                    <Button 
                        text="Log in to your account." 
                        buttonType={2} 
                        disabled={disableInput} 
                        className="auth-panel-nav-btn"
                        onClick={(e) => { e.preventDefault(); navigate("/login") }}
                    />
                </p>
                {statusEle}
            </form>
        </div>
    );
}

export default SignupPanel;