import type { StateSetter } from "@/types";
import { Button, Icon, Separator } from "@/ui/index";
import { ChevronDown, ChevronUp, EyeOff } from "lucide-react";
import { DismountButton } from "./dismount-button";

const css = {
  container: {
    position: "fixed",
    bottom: 8,
    right: 8,
    zIndex: 9999,
    pointerEvents: "auto",
    height: 40,
    border: "1px solid rgba(148,163,184,0.5)",
    backgroundColor: "rgb(255,255,255)",
    color: "#000",
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
    paddingRight: 2,
    gap: 4,
  },
  closeIcon: {
    color: "#dc2626",
  },
} as const;

interface Props {
  open: boolean;
  onToggleConfig: () => void;
  setShowLines: StateSetter<boolean>;
}

export function ConfigButton({ onToggleConfig, open, setShowLines }: Props) {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: number,
  ) => {
    if (item === 1) {
      onToggleConfig();
    } else {
      e.stopPropagation();
      setShowLines((v) => !v);
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
                color: "#000",
              }}
              variant={"transparent"}
              size="icon-sm"
              data-black
              key={item}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(e, item);
              }}
            >
              {item === 1 ? (
                <Icon
                  Icon={open ? ChevronDown : ChevronUp}
                  size={"3xl"}
                  strokeWidth="thin"
                  color="#000"
                />
              ) : (
                <Icon
                  Icon={EyeOff}
                  size="xl"
                  strokeWidth="thin"
                  color="#000"
                />
              )}
            </Button>
          ) : (
            <Separator orientation="vertical" style={{ height: "66%" }} />
          ),
        )}
        <DismountButton />
      </div>
    </div>
  );
}
