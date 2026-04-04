import { X } from "lucide-react";
import { Button, Icon } from "../ui";

export function DismountButton() {
  function handleDismount(e: React.MouseEvent) {
    e.stopPropagation();
    window.dispatchEvent(new Event("lines-overlay-dismount"));
  }

  return (
    <Button
      asChild
      size="icon-sm"
      variant="transparent"
      onClick={handleDismount}
      style={{
        color: "white",
        backgroundColor: "red",
        marginLeft: 6,
        borderRadius: 3,
      }}
    >
      <div>
        <Icon Icon={X} size="3xl" color="red" strokeWidth="light" />
      </div>
    </Button>
  );
}
