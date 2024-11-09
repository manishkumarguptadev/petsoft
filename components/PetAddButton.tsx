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

export default function PetAddButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="rounded-full">
          <PlusIcon className="h-6 w-6" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new pet</DialogTitle>
        </DialogHeader>

        <PetAddForm />
      </DialogContent>
    </Dialog>
  );
}
