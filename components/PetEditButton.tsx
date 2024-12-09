import { useState } from "react";
import PetEditForm from "./PetEditForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { flushSync } from "react-dom";

export default function PetEditButton() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="rounded-full">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit pet</DialogTitle>
        </DialogHeader>
        <PetEditForm
          onFormSubmission={() => {
            flushSync(() => {
              setIsFormOpen(false);
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
