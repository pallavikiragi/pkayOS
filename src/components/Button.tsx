import type { ButtonHTMLAttributes, ReactNode } from 'react';
import arrowEndDark from '../assets/figma/buttons/arrow-end-dark.svg';
import arrowEndLight from '../assets/figma/buttons/arrow-end-light.svg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'blue';
  showArrow?: boolean;
  compact?: boolean;
}

export function Button({
  children,
  variant = 'default',
  showArrow = false,
  compact = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`design-button design-button--${variant}${compact ? ' design-button--compact' : ''}${className ? ` ${className}` : ''}`}
    >
      <span className="design-button__label">{children}</span>
      {showArrow && (
        <img
          className="design-button__arrow"
          src={variant === 'blue' ? arrowEndLight : arrowEndDark}
          alt=""
          aria-hidden="true"
        />
      )}
    </button>
  );
}
