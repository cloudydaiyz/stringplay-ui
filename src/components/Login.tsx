// import React from 'react'

// import Logo from "./svg/Logo";
import TextField from "./TextField";
import Button from "./Button";
import "../App.css";
import "./Login.css";

const Login = () => {
  return (
    <div className="login">
        <div className="login-logo">
            {/* <Logo animated=t /> */}
            <h1>stringplay</h1>
        </div>
        <TextField title="Username" />
        <TextField title="Password" type="password" />
        <Button text="Log in" />
        <div>
            {/* <Button text="Forgot password?" buttonType={2} /> */}
            <Button text="Sign up" buttonType={2} />
        </div>
        <p>Sign in successful!</p>
    </div>
  )
}

export default Login