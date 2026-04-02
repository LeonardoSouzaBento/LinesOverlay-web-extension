import { Eye } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DismountButton } from "./components/dismount-button";
import {
  ConfigButton,
  ConfigOptions,
  MoveLinesButton,
} from "./components/index";
import type { StateSetter } from "./types";
import { Button, Icon } from "./ui";

const css = {
  overlay: {
    position: "absolute" as const,
    top: 175,
    left: 0,
    width: "100%",
    pointerEvents: "none" as const,
    display: "flex",
    justifyContent: "center",
    zIndex: 10,
  },
  grid: {
    width: "100%",
  },
  triggerButton: {
    position: "absolute" as const,
    bottom: 8,
    right: 8,
    zIndex: 20,
    backgroundColor: "rgba(255,255,255,0.90)",
  },
} as const;

type Props = {
  showLines: boolean;
  setShowLines: StateSetter<boolean>;
};

function LinesOverlayCore({ showLines, setShowLines }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState(2);
  const [gap, setGap] = useState(24);
  const [opacity, setOpacity] = useState(0.4);
  const [color, setColor] = useState("#d71212");
  const [showConfig, setShowConfig] = useState(false);
  const [rotate, setRotate] = useState(0);

  // Toggle por tecla
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === ";") {
        setShowLines((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!showLines) return null;

  const height = lines * gap;

  return (
    <>
      <div ref={containerRef} style={{ ...css.overlay, height }}>
        {/* linhas */}
        <div
          style={{
            ...css.grid,
            height,
            backgroundImage: `repeating-linear-gradient(
                to bottom,
                ${color},
                ${color} 1.25px,
                transparent 1px,
                transparent ${gap}px
              )`,
            opacity,
            transform: `rotate(${rotate}deg)`,
            borderBottom: `1.5px solid ${color}`,
          }}
        />
        {/* Move */}
        <MoveLinesButton targetRef={containerRef} />
      </div>
      {/* Config */}
      <ConfigButton
        setShowLines={setShowLines}
        onToggleConfig={() => setShowConfig((v) => !v)}
        open={showConfig}
      />
      {showConfig && (
        <ConfigOptions
          lines={lines}
          gap={gap}
          opacity={opacity}
          color={color}
          setLines={setLines}
          setGap={setGap}
          setOpacity={setOpacity}
          setColor={setColor}
          rotate={rotate}
          setRotate={setRotate}
        />
      )}
    </>
  );
}

export function LinesOverlay() {
  const [showLines, setShowLines] = useState(true);


  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9000,
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100dvh",
        fontFamily: "Inter, sans-serif",
        color: "#000",
      }}
    >
      <LinesOverlayCore
        setShowLines={setShowLines}
        showLines={showLines}
      />

      <Button
        size="sm"
        variant="ghost"
        style={{
          ...css.triggerButton,
          visibility: showLines ? "hidden" : "visible",
        }}
        onClick={() => setShowLines((v) => !v)}
      >
        <Icon Icon={Eye} size="xl" />
        Mostrar linhas <span style={{ color: "#787878ff" }}>( Ctrl + ; )</span>
        <DismountButton />
      </Button>
    </div>
  );
}
