import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { api } from "../../convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type RenameDialogProps = {
  documentId: Id<"documents">;
  initialTitle: string;
  children: React.ReactNode;
};

export default function RenameDialog({
  documentId,
  initialTitle,
  children,
}: RenameDialogProps) {
  const updateTitle = useMutation(api.documents.updateTitleById);

  const [isUpdating, setIsUpdating] = useState(false);

  const [title, setTitle] = useState(initialTitle);
  const [open, setOpen] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsUpdating(true);

    updateTitle({ id: documentId, title: title.trim() || "Untitled" })
      .then(() => setOpen(false))
      .finally(() => {
        setIsUpdating(false);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        onInteractOutside={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>
              Enter the new name for the document.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document name"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DialogFooter>
            <Button
              className="cursor-pointer"
              type="button"
              variant="ghost"
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isUpdating}
              onClick={(e) => e.stopPropagation()}
            >
              {isUpdating ? "Renaming..." : "Rename"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
