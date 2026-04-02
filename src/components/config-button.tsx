import { ChevronDown, ChevronUp, X } from "lucide-react";
import type { MouseEvent } from "react";
import type { StateSetter } from "@/types";
import { Button, Icon, Separator } from "@/ui/index";

const css = {
  container: {
    position: "fixed",
    bottom: 8,
    right: 8,
    zIndex: 9999,
    pointerEvents: "auto",
    height: 40,
    border: "1px solid rgba(148,163,184,0.5)",
    backgroundColor: "rgba(255,255,255,0.70)",
    boxShadow: "0 1px 3px rgba(15,23,42,0.2)",
    display: "flex",
    alignItems: "center",
    paddingLeft: 14,
    paddingRight: 4,
    borderRadius: 4,
  },
  label: {
    fontWeight: 600,
    letterSpacing: "0.03em",
    paddingRight: 8,
    fontSize: 14,
    userSelect: "none",
  },
  buttonsRow: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  closeIcon: {
    color: "#dc2626",
  },
} as const;

export function ConfigButton({
  onToggleConfig,
  open,
  setShow,
}: {
  open: boolean;
  onToggleConfig: () => void;
  setShow: StateSetter<boolean>;
}) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>, item: number) => {
    if (item === 1) {
      onToggleConfig();
    } else {
      e.stopPropagation();
      setShow((v) => !v);
    }
  };

  return (
    <div style={css.container}>
      <span
        style={css.label}
        onClick={(e) => {
          e.stopPropagation();
          onToggleConfig();
        }}
      >
        Configurar
      </span>

      <div style={css.buttonsRow}>
        {[1, 2, 3].map((item) =>
          item !== 2 ? (
            <Button
              style={{
                outlineWidth: 1,
              }}
              variant={"transparent"}
              size="icon-sm"
              data-black
              key={item}
              onClick={(e) => {
                handleClick(e, item);
              }}
            >
              {item === 1 ? (
                <Icon
                  Icon={open ? ChevronDown : ChevronUp}
                  size={"xl"}
                  strokeWidth="light"
                />
              ) : (
                <Icon Icon={X} size="sm" strokeWidth="light" />
              )}
            </Button>
          ) : (
            <Separator orientation="vertical" />
          )
        )}
      </div>
    </div>
  );
}
