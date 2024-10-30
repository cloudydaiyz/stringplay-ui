import '../app/shared.css';
import './LoadingBackground.css';

interface LoadingBackgroundProps {
    doneLoading?: boolean;
    className?: string;
}

const LoadingBackground = ({ doneLoading = false, children, className = '' }: React.PropsWithChildren<LoadingBackgroundProps>) => {
  return (
    <div className={`loading-bg ${className}`}>
        <div className={`loading-bg-left ${doneLoading ? 'inactive' : ''}`}></div>
        <div className={`loading-bg-right ${doneLoading ? 'inactive' : ''}`}></div>
        {children}
    </div>
  )
}

export default LoadingBackground