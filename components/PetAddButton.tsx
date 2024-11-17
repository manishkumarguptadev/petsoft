"use client";
import { PlusIcon } from "@radix-ui/react-icons";
import PetAddForm from "./PetAddForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { flushSync } from "react-dom";

export default function PetAddButton() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className="rounded-full">
          <PlusIcon className="h-6 w-6" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new pet</DialogTitle>
        </DialogHeader>

        <PetAddForm
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
