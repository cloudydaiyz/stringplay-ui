import "./PageNotFoundPanel.css";
import LoginLogo from './common/LoginLogo';

const PageNotFoundPanel = () => {
  return (
    <div className="page-not-found-panel">
        <LoginLogo />
        <h2>404</h2>
        <h3>Page Not Found</h3>
        <p>The requested page was not found.</p>
    </div>
  )
}

export default PageNotFoundPanel