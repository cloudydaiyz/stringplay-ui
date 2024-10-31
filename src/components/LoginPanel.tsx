// import { useState } from 'react';

import TextField from "./common/TextField";
import Button from "./common/Button";
import LoginLogo from "./common/LoginLogo";

import "../app/shared.css";
import "./LoginPanel.css";

interface LoginPanelProps {
  status?: "" | "logging in" | "logged in" | 400 | 500 | 503;
  inactive?: boolean,
}

const LoginPanel = ({ status = "", inactive = false }: LoginPanelProps) => {
  // let [error, setError] = useState<null | 400 | 500 | 503>(null);
  // let [loggingIn, setLoggingIn] = useState(false);
  // let [loggedIn, setLoggedIn] = useState(false);
  const error = status == 400 ? 400 : status == 500 ? 500 : status == 503 ? 503 : null;
  const loggingIn = status == "logging in";
  const loggedIn = status == "logged in";

  let statusEle: JSX.Element = <p key={`${Date.now()}`} className="login-status">&nbsp;</p>;
  if(loggingIn) {
    statusEle = <p key={`${Date.now()}`} className="login-status">&nbsp;Verifying your information...</p>;
  } else if(loggedIn) {
    statusEle = <p key={`${Date.now()}`} className="login-status">&nbsp;Log in successful!</p>;
  } else if(error == 400) {
    statusEle = <p key={`${Date.now()}`} className="login-status error">&nbsp;Login failed.</p>;
  } else if(error == 500) {
    statusEle = <p key={`${Date.now()}`} className="login-status error">&nbsp;A server error has occurred.</p>;
  } else if(error == 503) {
    statusEle = <p key={`${Date.now()}`} className="login-status error">&nbsp;This service is currently unavailable. Please try again later.</p>;
    // Redirect to `NoServicePanel`
  }

  const disableInput = loggingIn || loggedIn || error == 503;
  return (
    <div className={`login-panel ${inactive ? "inactive" : ""}`}>
        <LoginLogo animated={loggingIn && !loggedIn} size="m" />
        <form action="" onSubmit={e => { e.preventDefault() }} noValidate={true}>
          <div className="login-text-fields">
            <TextField title="Username or Email" disabled={disableInput} />
            <TextField title="Password" type="password" disabled={disableInput} />
          </div>
          <Button text="Log in" disabled={disableInput} />
          <Button text="Create an account" buttonType={2} disabled={disableInput} />
          {statusEle}
        </form>
    </div>
  )
}

export default LoginPanel