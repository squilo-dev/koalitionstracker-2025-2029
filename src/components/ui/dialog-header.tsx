import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";

interface DialogHeaderProps {
  title: string;
  onClose: () => void;
}

export function DialogHeader({ title, onClose }: DialogHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <DialogTitle>{title}</DialogTitle>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-4 w-4" />
        <span className="sr-only">Schließen</span>
      </Button>
    </div>
  );
} 