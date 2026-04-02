import React, { ReactNode } from 'react';

interface ButtonsWrapperProps {
  children: ReactNode;
  className?: string;
  gap?: number;
}

export const ButtonsWrapper: React.FC<ButtonsWrapperProps> = ({
  children,
  className = '',
  gap = 3,
}) => {
  const css = {
    container: {
      height: 'auto',
      display: 'flex',
      flexWrap: 'wrap' as const,
      alignItems: 'center',
      gap: `${gap * 0.25}rem`,
    },
  } as const;

  return (
    <div style={css.container} className={className}>
      {children}
    </div>
  );
};
