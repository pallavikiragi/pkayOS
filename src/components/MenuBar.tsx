import { useEffect, useState } from 'react';
import { MENU_ITEMS } from '../data/content';

export function MenuBar() {
  const [time, setTime] = useState('');

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

  return (
    <header className="menu-bar">
      <nav className="menu-bar__left" aria-label="System menu">
        {MENU_ITEMS.map((item, i) => (
          <span key={item} className="menu-bar__item">
            {i === 0 ? <strong>{item}</strong> : item}
          </span>
        ))}
      </nav>
      <div className="menu-bar__clock" aria-live="polite">
        {time}
      </div>
    </header>
  );
}
