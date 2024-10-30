import Logo from './svg/Logo'
import '../app/shared.css'
import './LoginLogo.css'

interface LoginLogoProps {
    animated?: boolean;
    darkMode?: boolean;
    name?: string;
    size?: 's' | 'm' | 'l';
}

const LoginLogo = ({ animated = false, darkMode = false, name = "STRINGPLAY", size = 's' }: LoginLogoProps) => {
  return (
    <div className="login-logo">
        <Logo animated={animated} stroke={darkMode} size={size} />
        <h1 className={darkMode ? "dark-mode" : ""}>{name}</h1>
    </div>
  )
}

export default LoginLogo