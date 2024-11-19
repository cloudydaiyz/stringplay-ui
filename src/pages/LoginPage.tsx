import LoadingBackground from "../components/LoadingBackground";
import LoginPanel from "../components/LoginPanel";

import '../app/shared.css';

const LoginPage = () => {
    return (
        <LoadingBackground className="auth-page" doneLoading={false}>
            <LoginPanel />
        </LoadingBackground>
    )
}

export default LoginPage;