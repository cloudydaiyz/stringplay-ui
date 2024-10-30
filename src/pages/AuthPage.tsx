import LoadingBackground from "../components/LoadingBackground";
import LoginPanel from "../components/LoginPanel";
import SignupPanel from "../components/SignupPanel";
import Logo from "../components/svg/Logo";

import './AuthPage.css';

interface AuthPageProps {
    /**
     * The state of the auth page.
     * - `signup`: The sign up screen
     * - `login`: The log in screen
     * - `loading`: The loading screen
     * - `loaded`: Dashboard assets loaded, stop animations and prepare for loading bg
     * - `done-loading`: Bg animation opening to the dashboard
     */
    state?: "signup" | "login" | "loading" | "loaded" | "done-loading";
}

const AuthPage = ({ state = "signup" }: AuthPageProps) => {
  return (
    <div>
        <LoadingBackground className="auth-page">
            {
                state == "signup" ? <SignupPanel />
                : state == "login" ? <LoginPanel />
                : <div className="auth-page-logo">
                    <Logo stroke={true} size="l" animated={true} />
                    <h3>Loading...</h3>
                </div>
            }
        </LoadingBackground>
    </div>
  )
}

export default AuthPage;