import { useEffect, useState, useRef } from 'react';
import { MENU_ITEMS } from '../data/content';

export function MenuBar() {
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

  const activeMenuItems = MENU_ITEMS.find((m) => m.label === activeMenu)?.items;

  return (
    <header className="menu-bar">
      <nav className="menu-bar__left" aria-label="System menu" ref={menuRef}>
        {MENU_ITEMS.map((menu) => (
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
                    <button key={subItem} type="button" className="mega-menu__item">
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
