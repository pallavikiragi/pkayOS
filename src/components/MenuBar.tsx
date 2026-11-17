import { useEffect, useState, useRef, useCallback } from 'react';
import { DESIGN_MENU_ITEMS, SOUND_MENU_ITEMS } from '../data/content';
import type { OSMode, WindowKind, OSWindow } from '../types';
import navLogo from '../assets/navigation/logo.svg';
import figmaIcon from '../assets/navigation/figma.svg';
import emailIcon from '../assets/navigation/email.svg';
import aiIcon from '../assets/navigation/ai.svg';
import batteryIcon from '../assets/navigation/battery.svg';
import wifiIcon from '../assets/navigation/wifi.svg';
import searchIcon from '../assets/navigation/search.svg';

interface MenuBarProps {
  mode: OSMode;
  activePage: 'home' | 'profile';
  onOpenPage: (kind: WindowKind, archiveType?: OSWindow['archiveType']) => void;
  onToggleMode: () => void;
  onShowHome: () => void;
  onShowProfile: () => void;
}

export function MenuBar({
  mode,
  activePage,
  onOpenPage,
  onToggleMode,
  onShowHome,
  onShowProfile,
}: MenuBarProps) {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
      );
      setDate(
        now.toLocaleDateString('en-GB', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubItemClick = useCallback((subItem: string) => {
    setActiveMenu(null);
    const item = subItem.toLowerCase();

    // ARCHIVE
    if (item === 'all projects') onOpenPage('archive', 'all');
    else if (item === 'featured work') onOpenPage('archive', 'feature');
    else if (item === 'studio work') onOpenPage('archive', 'studio');
    else if (item === 'experiments') onOpenPage('experiments');
    
    // NETWORK
    else if (item === 'collaborations') onOpenPage('collaborations');
    else if (item === 'socials') onOpenPage('socials');
    else if (item === 'contact') onOpenPage('contact');
    else if (item === 'clients') onOpenPage('clients');

    // MEMORY
    else if (item === 'about') onOpenPage('about');
    else if (item === 'resume') onOpenPage('resume');
    else if (item === 'journey') onOpenPage('journey');
    else if (item === 'logs') onOpenPage('logs');
    else if (item === 'inspirations') onOpenPage('inspirations');
    else if (item === 'writings') onOpenPage('writings');
  }, [onOpenPage]);

  const menuItems = mode === 'design' ? DESIGN_MENU_ITEMS : SOUND_MENU_ITEMS;
  const activeMenuItems = menuItems.find((m) => m.label === activeMenu)?.items;

  return (
    <header className="menu-bar">
      <nav className="menu-bar__left" aria-label="System menu" ref={menuRef}>
        <img className="menu-bar__logo" src={navLogo} alt="" />
        <button type="button" className="menu-bar__brand" onClick={() => setActiveMenu(null)}>
          <strong>PALLAVI OS</strong>
        </button>
        <span className="menu-bar__slash" aria-hidden="true">/</span>
        {[
          { label: 'Home', active: activePage === 'home' },
          { label: 'Archive', active: false },
          { label: 'Profile', active: activePage === 'profile' },
        ].map((menu) => (
          <div key={menu.label} className="menu-bar__container">
            <button
              type="button"
              className={`menu-bar__item ${menu.active ? 'menu-bar__item--active' : ''}`}
              onClick={() => {
                if (menu.label === 'Archive') onOpenPage('archive', 'all');
                if (menu.label === 'Profile') {
                  setActiveMenu(null);
                  onShowProfile();
                }
                if (menu.label === 'Home') {
                  setActiveMenu(null);
                  onShowHome();
                }
              }}
            >
              {menu.label}
            </button>
          </div>
        ))}

        {activeMenu && (
          <div className="mega-menu">
            <div className="mega-menu__left">
              <div className="mega-menu__profile">
                <span className="mega-menu__name">Pallavi Kiragi</span>
                <span className="mega-menu__role">Interaction Designer</span>
                <span className="mega-menu__role">Generalist</span>
                <span className="mega-menu__role">UX</span>
                <span className="mega-menu__role">Artist</span>
                <span className="mega-menu__location">Located in Bangalore, India</span>
              </div>
            </div>
            <div className="mega-menu__right">
              {activeMenuItems ? (
                <div className="mega-menu__grid">
                  {activeMenuItems.map((subItem) => (
                    <button 
                      key={subItem} 
                      type="button" 
                      className="mega-menu__item"
                      onClick={() => handleSubItemClick(subItem)}
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mega-menu__empty">
                  Select a category to explore the OS.
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      <div className="menu-bar__controls">
        <div className="menu-bar__system-icons" aria-hidden="true">
          <img src={figmaIcon} alt="" />
          <img src={emailIcon} alt="" />
          <button type="button" className="menu-bar__ai" onClick={onToggleMode} aria-label="Toggle OS mode">
            <img src={aiIcon} alt="" />
          </button>
          <img src={batteryIcon} alt="" />
          <img src={wifiIcon} alt="" />
          <img src={searchIcon} alt="" />
        </div>
        <span className="menu-bar__date">{date}</span>
        <div className="menu-bar__clock" aria-live="polite">
          {time}
        </div>
      </div>
    </header>
  );
}
