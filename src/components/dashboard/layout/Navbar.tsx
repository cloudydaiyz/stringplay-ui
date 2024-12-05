import { useState } from 'react';
import '../../../app/shared.css';
import './Navbar.css';

import Calendar from '../../svg/Calendar';
import Group from '../../svg/Group';
import Home from '../../svg/Home';
import User from '../../svg/User';
import DocumentIcon from '../../svg/DocumentIcon';

export type NavPage = 'dashboard' | 'troupe' | 'event-log' | 'member-log' | 'sources';

interface NavbarProps {
    initialPage: NavPage,
    onNavigate: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: NavPage, setPage: React.Dispatch<React.SetStateAction<NavPage>>) => void;
}

const Navbar = ({ initialPage = 'dashboard', onNavigate }: NavbarProps) => {
  const [page, setPage] = useState<NavPage>(initialPage);

  const sections: Record<NavPage, JSX.Element> = {
    dashboard: <><Home />Dashboard</>,
    sources: <><DocumentIcon />Sources</>,
    'event-log': <><Calendar />Event Log</>,
    'member-log': <><User />Member Log</>,
    troupe: <><Group />Troupe</>,
  };

  const menuItems: JSX.Element[] = [];
  for(const section in sections) {
    const item = sections[section as keyof typeof sections];
    menuItems.push(<li key={section}>
      <button 
        onClick={(e) => onNavigate(e, section as NavPage, setPage)} 
        className={page == section ? 'current' : ''} 
        data-page={section}
      >
        {item}
      </button>
    </li>);
  }

  return (
    <nav className="app-nav">
        <menu>{menuItems}</menu>
    </nav>
  )
}

export default Navbar;