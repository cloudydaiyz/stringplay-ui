import LoadingBackground from "../components/LoadingBackground";
import LoginPanel from "../components/LoginPanel";
import NoServicePanel from "../components/NoServicePanel";
import SignupPanel from "../components/SignupPanel";
import Logo from "../components/svg/Logo";

import './AuthPage.css';

interface AuthPageProps {
    /**
     * The state of the auth page.
     * - `login`: The log in screen
     * - `signup`: The sign up screen
     * - `loading`: The loading screen
     * - `loaded`: Dashboard assets loaded, stop animations and prepare for loading bg
     * - `done-loading`: Bg animation opening to the dashboard
     * - `500`: Server error
     */
    state?:  "login" | "signup" | "loading" | "done-loading" | 500;
}

const AuthPage = ({ state = "login" }: AuthPageProps) => {
  return (
    <LoadingBackground className="auth-page" doneLoading={state == "done-loading"}>
        <LoginPanel inactive={state != "login"} />
        <SignupPanel inactive={state != "signup"} /> 
        <NoServicePanel inactive={state != 500} />
        <div className={`auth-page-loading ${state == "loading" || state == "done-loading" ? state : "inactive"}`}>
            <Logo stroke={false} size="l" animated={state == "loading"} />
            <h3>Loading...</h3>
        </div>
    </LoadingBackground>
  )
}

export default AuthPage;