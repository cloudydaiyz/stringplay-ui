import '../app/shared.css';
import './LoadingBackground.css';

interface LoadingBackgroundProps {
    doneLoading?: boolean;
}

const LoadingBackground = ({ doneLoading = false }: LoadingBackgroundProps) => {
  return (
    <div className='loading-bg'>
        <div className={`loading-bg-left ${doneLoading ? 'inactive' : ''}`}></div>
        <div className={`loading-bg-right ${doneLoading ? 'inactive' : ''}`}></div>
    </div>
  )
}

export default LoadingBackground