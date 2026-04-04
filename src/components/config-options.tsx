import { RotateCw } from "lucide-react";
import { Button, Icon } from "../ui";
import { type ConfigOptionsProps, NUMBER_FIELDS, colorOptions } from "./data";

const css = {
  container: {
    position: "fixed",
    bottom: 52,
    right: 8,
    zIndex: 1000,
    pointerEvents: "auto",
    backgroundColor: "rgba(255,255,255,0.94)",
    backdropFilter: "blur(4px)",
    boxShadow: "0 4px 6px rgba(15,23,42,0.12)",
    border: "1px solid rgba(148,163,184,0.3)",
    borderRadius: 6,
    paddingInline: 12,
    paddingBlock: 10,
    width: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 4,
  },
  fieldRow: {
    width: "100%",
    marginBottom: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  wrapper: {
    display: "flex",
    alignItems: "flex-end",
    gap: 8,
    borderRadius: 4,
  },
  inputWrapper: {
    width: 104,
  },
  label: {
    display: "block",
    fontWeight: 500,
    marginBottom: 5,
    fontSize: 14,
  },
  numberInput: {
    width: "100%",
    height: 32,
    borderRadius: 4,
    border: "1px solid #e5e7eb",
    paddingInline: 8,
    boxSizing: "border-box",
    fontSize: 14,
    color: "#000",
    backgroundColor: "rgba(255,255,255,0.50)",
  },
  quickRow: {
    display: "flex",
    gap: 6,
    marginTop: 4,
  },
  quickButton: {
    fontWeight: 500,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.50)",
  },
  colorSection: {
    marginBottom: 12,
  },
  colorLabel: {
    display: "block",
    fontWeight: 500,
    marginBottom: 4,
    fontSize: 14,
  },
  colorRow: {
    display: "flex",
    gap: 8,
  },
  colorDot: {
    display: "block",
    width: "80%",
    height: "80%",
    borderRadius: 999,
  },
} as const;

export function ConfigOptions(props: ConfigOptionsProps) {
  const fieldBindings = {
    lines: { value: props.lines, set: props.setLines },
    gap: { value: props.gap, set: props.setGap },
    opacity: { value: props.opacity, set: props.setOpacity },
  };

  return (
    <div style={css.container}>
      {NUMBER_FIELDS.map((field) => {
        const binding = fieldBindings[field.key];

        return (
          <div style={css.fieldRow} key={field.key}>
            <div style={css.wrapper}>
              <div style={css.inputWrapper}>
                <label style={css.label}>{field.label}</label>
                <input
                  style={css.numberInput}
                  type="number"
                  step={field.step}
                  value={binding.value}
                  onChange={(e) => binding.set(+e.target.value)}
                />
              </div>
              <div style={css.quickRow}>
                {field.quick.map((v) => {
                  return (
                    <Button
                      selected={binding.value === v}
                      key={v}
                      data-option
                      variant="ghost"
                      size="icon-sm"
                      style={css.quickButton}
                      onClick={() => binding.set(v)}
                    >
                      {v}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

      <div style={css.colorSection}>
        <span style={css.colorLabel}>Cor</span>
        <div style={css.colorRow}>
          {colorOptions.map((c) => (
            <Button
              style={{ borderRadius: 999 }}
              key={c.value}
              variant="ghost"
              size="icon-sm"
              title={c.name}
              onClick={() => props.setColor(c.value)}
            >
              <span style={{ ...css.colorDot, backgroundColor: c.value }} />
            </Button>
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        style={{ width: "100%" }}
        onClick={() => {
          if (props.rotate === 0) {
            props.setRotate(90);
          } else {
            props.setRotate(0);
          }
        }}
      >
        <Icon Icon={RotateCw} size="xl" strokeWidth="light" /> Rotacionar
      </Button>
    </div>
  );
}
