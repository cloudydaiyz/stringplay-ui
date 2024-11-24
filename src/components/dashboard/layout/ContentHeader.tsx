import '../../../app/shared.css';
import { useMetadata } from '../../../lib/api-client';
import Refresh from '../../svg/Refresh';
import './ContentHeader.css';

interface ContentHeaderProps {
    title: string,
}

const ContentHeader = ({ title }: ContentHeaderProps) => {
  const { lastUpdated = new Date(), loading, getConsoleData } = useMetadata();

  return (
    <header className='content-header'>
        <h2>{title}</h2>
        <span className={`app-refresh ${loading ? 'loading' : ''}`}>
          {
            loading
            ? <p>Loading...</p>
            : <p>Last updated: {lastUpdated.toUTCString()}</p>
          }
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