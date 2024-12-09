import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormClientSchema } from "@/lib/validationSchemas";
import { z } from "zod";
import { usePetContext } from "@/lib/hooks";
import { DEFAULT_PET_IMAGE } from "@/lib/constants";

export default function PetEditForm({
  onFormSubmission,
}: {
  onFormSubmission: () => void;
}) {
  const { handleEditPet, selectedPet } = usePetContext();
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof petFormClientSchema>>({
    resolver: zodResolver(petFormClientSchema),
    defaultValues: {
      name: selectedPet?.name,
      ownerName: selectedPet?.ownerName,
      image: "",
      age: selectedPet?.age,
      notes: selectedPet?.notes,
    },
  });
  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return;
        const values = getValues();
        const petData = {
          ...values,
          image: values.image
            ? DEFAULT_PET_IMAGE
            : (selectedPet?.image as string),
        };

        await handleEditPet(selectedPet?.id as string, petData);
        onFormSubmission();
      }}
      className="flex flex-col"
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register("ownerName")} />
          {errors.ownerName && (
            <p className="text-red-500">{errors.ownerName.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            id="image"
            accept="image/*"
            {...register("image")}
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input id="age" {...register("age")} />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" {...register("notes")} />
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="mt-5 self-end">
        Edit pet
      </Button>
    </form>
  );
}
