import "../app/shared.css";
import "./NoServicePanel.css";
import LoginLogo from "./common/LoginLogo";

interface NoServicePanelProps {
  inactive?: boolean,
}

const NoServicePanel = ({inactive = false}: NoServicePanelProps) => {
  return (
    <div className={`no-service-panel ${inactive ? "inactive" : ""}`}>
        <LoginLogo />
        <h2>503</h2>
        <h3>Service Unavailable</h3>
        <p>We're unable to provide services at the moment. Please check back in later!</p>
    </div>
  );
}

export default NoServicePanel;