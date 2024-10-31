import { useState } from 'react';
import '../app/shared.css';
import './Navbar.css';

import Calendar from './svg/Calendar';
import Group from './svg/Group';
import Home from './svg/Home';
import Settings from './svg/Settings';
import User from './svg/User';

export type NavPage = 'dashboard' | 'troupe' | 'event-log' | 'member-log' | 'settings';

interface NavbarProps {
    initialPage: NavPage,
    onNavigate: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, setPage: React.Dispatch<React.SetStateAction<NavPage>>) => void;
}

const Navbar = ({ initialPage = 'dashboard', onNavigate }: NavbarProps) => {
  const [page, setPage] = useState<NavPage>(initialPage);

  const sections = {
    dashboard: <><Home />Dashboard</>,
    troupe: <><Group />Troupe</>,
    'event-log': <><Calendar />Event Log</>,
    'member-log': <><User />Member Log</>,
    settings: <><Settings />Settings</>,
  };

  const menuItems: JSX.Element[] = [];
  for(const section in sections) {
    const item = sections[section as keyof typeof sections];
    menuItems.push(<li key={section}>
      <button 
        onClick={(e) => onNavigate(e, setPage)} 
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