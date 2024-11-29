import PetEditForm from "./PetEditForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function PetEditButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="rounded-full">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit pet</DialogTitle>
        </DialogHeader>
        <PetEditForm />
      </DialogContent>
    </Dialog>
  );
}
