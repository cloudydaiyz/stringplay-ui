import '../../app/shared.css';
import './ContentHeader.css';

interface ContentHeaderProps {
    title: string,
    lastUpdated?: Date,
}

const ContentHeader = ({ title, lastUpdated = new Date() }: ContentHeaderProps) => {
  return (
    <header className='content-header'>
        <h2>{title}</h2>
        <p>Last updated: {lastUpdated.toUTCString()}</p>
    </header>
  )
}

export default ContentHeader;