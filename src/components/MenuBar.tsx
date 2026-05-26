import { useEffect, useState, useRef, useCallback } from 'react';
import { DESIGN_MENU_ITEMS, SOUND_MENU_ITEMS } from '../data/content';
import type { OSMode, WindowKind, OSWindow } from '../types';

interface MenuBarProps {
  mode: OSMode;
  onOpenPage: (kind: WindowKind, archiveType?: OSWindow['archiveType']) => void;
}

export function MenuBar({ mode, onOpenPage }: MenuBarProps) {
  const [time, setTime] = useState('');
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
        {menuItems.map((menu) => (
          <div key={menu.label} className="menu-bar__container">
            <button
              type="button"
              className={`menu-bar__item ${activeMenu === menu.label ? 'menu-bar__item--active' : ''}`}
              onClick={() => setActiveMenu(activeMenu === menu.label ? null : menu.label)}
            >
              {menu.isBold ? <strong>{menu.label}</strong> : menu.label}
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
      <div className="menu-bar__clock" aria-live="polite">
        {time}
      </div>
    </header>
  );
}
