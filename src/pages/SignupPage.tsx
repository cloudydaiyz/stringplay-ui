import LoadingBackground from "../components/LoadingBackground";
import SignupPanel from "../components/SignupPanel";

import '../app/shared.css';

export const SignupPage = () => {
    return (
        <LoadingBackground className="auth-page" doneLoading={false}>
            <SignupPanel/>
        </LoadingBackground>
    )
}