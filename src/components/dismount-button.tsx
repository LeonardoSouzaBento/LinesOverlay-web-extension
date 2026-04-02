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
      style={{ color: "red" }}
    >
      <div>
        <Icon Icon={X} size="xl" color="red" />
      </div>
    </Button>
  );
}
