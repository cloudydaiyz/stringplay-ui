import '../../../app/shared.css';
import { useMetadata } from '../../../lib/api-client';
import Refresh from '../../svg/Refresh';
import './ContentHeader.css';

interface ContentHeaderProps {
    title: string,
}

const ContentHeader = ({ title }: ContentHeaderProps) => {
  const { loading, getConsoleData } = useMetadata();

  return (
    <header className='content-header'>
        <h2>{title}</h2>
        <span className={`app-refresh ${loading ? 'loading' : ''}`}>
          <button 
              className="app-refresh-btn"
              onClick={() => getConsoleData()}
              disabled={loading}
          >
            <Refresh />
          </button>
        </span>
    </header>
  )
}

export default ContentHeader;