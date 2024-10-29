import Logo from './svg/Logo'
import '../app/shared.css'
import './LoginLogo.css'

interface LoginLogoProps {
    animated?: boolean;
    darkMode?: boolean;
    name?: string;
}

const LoginLogo = ({ animated = false, darkMode = false, name = "stringplay" }: LoginLogoProps) => {
  return (
    <div className="login-logo">
        <Logo animated={animated} stroke={darkMode} />
        <h1 className={darkMode ? "dark-mode" : ""}>{name}</h1>
    </div>
  )
}

export default LoginLogo