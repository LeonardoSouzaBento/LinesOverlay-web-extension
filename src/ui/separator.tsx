import * as React from 'react';

const css = {
  base: {
    flexShrink: 0,
    backgroundColor: '#e5e7eb',
  },
  horizontal: {
    height: 1,
    width: '100%',
  },
  vertical: {
    height: '100%',
    width: 1,
  },
} as const;

type SeparatorProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
};

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', decorative = true, style, ...props }, ref) => {
    const dimensionStyle = orientation === 'horizontal' ? css.horizontal : css.vertical;

    const ariaProps = decorative
      ? { role: 'none' as const }
      : {
          role: 'separator' as const,
          'aria-orientation': orientation,
        };

    return (
      <div
        ref={ref}
        style={{ ...css.base, ...dimensionStyle, ...style }}
        className={className}
        {...ariaProps}
        {...props}
      />
    );
  },
);
Separator.displayName = 'Separator';

export { Separator };
