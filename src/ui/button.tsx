import * as React from "react";

type ButtonVariant = "default" | "ghost" | "transparent";
type ButtonSize = "default" | "sm" | "icon-sm";

const styles = {
  base: {
    width: "auto",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 4,
    border: "none",
    position: "relative",
    outline: "none !important",
    fontWeight: 600,
    fontSize: 14,
  } satisfies React.CSSProperties,

  variants: {
    default: {
      backgroundColor: "#0ea5e9",
      color: "#ffffff",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "#111827",
      border: "1px solid #d6d6d6ff",
    },
    transparent: {
      backgroundColor: "transparent",
    },
  } satisfies Record<ButtonVariant, React.CSSProperties>,

  sizes: {
    default: {
      minHeight: 40,
      paddingInline: 12,
      paddingBlock: (12 * 0.73438) / 0.93,
    },
    sm: {
      minHeight: 36,
      paddingInline: 12,
      paddingBlock: 10,
    },
    "icon-sm": {
      width: 32,
      height: 32,
      padding: 0,
    },
  } satisfies Record<ButtonSize, React.CSSProperties>,

  selected: {
    border: "2px solid #60a5fa",
    color: "#0ea5e9",
    backgroundColor: "rgba(59,130,246,0.08)",
  } satisfies React.CSSProperties,

  closeButton: {
    color: "#0f172a",
  } satisfies React.CSSProperties,
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  selected?: boolean;
  disabled?: boolean;
  closeButton?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type ResolveButtonStyleParams = {
  variant: ButtonVariant;
  size: ButtonSize;
  selected?: boolean;
  disabled?: boolean;
  closeButton?: boolean;
  style?: React.CSSProperties;
};

export function resolveButtonStyles({
  variant,
  size,
  selected = false,
  disabled = false,
  closeButton = false,
  style,
}: ResolveButtonStyleParams): React.CSSProperties {
  return {
    ...styles.base,
    ...styles.variants[variant],
    ...styles.sizes[size],
    ...(disabled && { opacity: 0.6, cursor: "not-allowed" }),
    ...(selected && styles.selected),
    ...(closeButton && styles.closeButton),
    ...style,
  };
}

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, className, style, ...slotProps }, ref) => {
    if (!children || !React.isValidElement(children)) {
      return null;
    }

    const child = children as React.ReactElement<any>;
    const mergedClassName = [className, child.props.className]
      .filter(Boolean)
      .join(" ");
    const mergedStyle = { ...style, ...child.props.style };

    return React.cloneElement(child, {
      ...slotProps,
      ...child.props,
      className: mergedClassName || undefined,
      style: mergedStyle,
      ref,
    });
  }
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      selected = false,
      disabled = false,
      closeButton = false,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={className}
        disabled={disabled}
        style={resolveButtonStyles({
          variant,
          size,
          selected,
          disabled,
          closeButton,
          style,
        })}
        {...props}
      />
    );
  }
);
