// import { useState } from 'react';

import TextField from "./common/TextField";
import Button from "./common/Button";
import LoginLogo from "./common/LoginLogo";

import "../app/shared.css";
import "./SignupPanel.css";

interface SignupPanelProps {
  status?: "" | "signing up" | "signed up" | 400 | 500 | 503;
  inactive?: boolean,
}

const SignupPanel = ({ status = "", inactive = false }: SignupPanelProps) => {
  // let [error, setError] = useState<null | 400 | 500 | 503>(null);
  // let [loggingIn, setLoggingIn] = useState(false);
  // let [loggedIn, setLoggedIn] = useState(false);
  const error = status == 400 ? 400 : status == 500 ? 500 : status == 503 ? 503 : null;
  const loggingIn = status == "signing up";
  const loggedIn = status == "signed up";

  let statusEle: JSX.Element = <p key={`${Date.now()}`} className="signup-status">&nbsp;</p>;
  if(loggingIn) {
    statusEle = <p key={`${Date.now()}`} className="signup-status">&nbsp;Verifying your information...</p>;
  } else if(loggedIn) {
    statusEle = <p key={`${Date.now()}`} className="signup-status">&nbsp;Sign up successful!</p>;
  } else if(error == 400) {
    statusEle = <p key={`${Date.now()}`} className="signup-status error">Sign up failed.<br/>Username already exists.</p>;
  } else if(error == 500) {
    statusEle = <p key={`${Date.now()}`} className="signup-status error">&nbsp;A server error has occurred.</p>;
  } else if(error == 503) {
    statusEle = <p key={`${Date.now()}`} className="signup-status error">&nbsp;This service is currently unavailable. Please try again later.</p>;
    // Redirect to `NoServicePanel`
  }

  const disableInput = loggingIn || loggedIn || error == 503;
  return (
    <div className={`signup-panel ${inactive ? "inactive" : ""}`}>
        <LoginLogo animated={loggingIn && !loggedIn} size="m" />
        <form action="" onSubmit={e => { e.preventDefault() }} noValidate={true}>
          <div className="signup-text-fields">
            <TextField title="Email address*" disabled={disableInput} />
            <TextField title="New username*" disabled={disableInput} />
            <TextField title="New password*" type="password" disabled={disableInput} />
            <TextField title="Repeat your new password*" type="password" disabled={disableInput} />
            <TextField title="Invite code" disabled={disableInput} />
          </div>
          <Button text="Sign up" disabled={disableInput} />
          <Button text="Log in to your account" buttonType={2} disabled={disableInput} />
          {statusEle}
        </form>
    </div>
  )
}

export default SignupPanel;