import LoadingBackground from "../components/LoadingBackground";
import LoginPanel from "../components/LoginPanel";

import '../app/shared.css';

export const LoginPage = () => {
    return (
        <LoadingBackground className="auth-page" doneLoading={false}>
            <LoginPanel />
        </LoadingBackground>
    )
}