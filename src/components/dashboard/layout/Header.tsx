// import React from 'react';

import '../../../app/shared.css';
import Button from '../../common/Button';
import LoginLogo from '../../common/LoginLogo';
import './Header.css';

interface HeaderProps {
    username: string;
    onLogOut?: () => void;
}

const Header = ({ username, onLogOut }: HeaderProps) => {
  return (
    <header className='app-header'>
        <LoginLogo size='xs'/>
        <div className='app-header-user'>
            <p>{username}</p>
            <Button text='Log out' onClick={onLogOut} />
        </div>
    </header>
  );
}

export default Header;