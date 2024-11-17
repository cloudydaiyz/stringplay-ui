import { useState } from 'react';
import '../../../app/shared.css';
import Button from '../../common/Button';
import './ContentNav.css';
import Line from '../../common/Line';
import React from 'react';

interface ContentNavProps<T extends Record<string, string>> {
  pageIdToTitleMap: {key: keyof T, title: T[string]}[];
  initialPageId: keyof T;
  onClick?: (key: keyof T) => void;
}

export default function ContentNav<T extends Record<string, string>>(
  { pageIdToTitleMap, initialPageId, onClick}: ContentNavProps<T>
) {
  const [page, setPage] = useState(initialPageId);

  const menuItems = pageIdToTitleMap.map((item, i) => (
    <React.Fragment key={2*i}>
      <li key={2*i}>
        <Button 
          buttonType={2} 
          text={item.title} 
          onClick={() => { if(onClick) onClick(item.key); setPage(item.key) }} 
          disabled={page == item.key} 
          className='content-nav-btn'
          key={2*i}
        />
      </li>
      { i < pageIdToTitleMap.length - 1 && <Line key={2*i+1} /> }
    </React.Fragment>
  ));

  return (
    <nav className='content-nav content-unit'>
      <menu>
          {menuItems}
      </menu>
    </nav>
  );
}