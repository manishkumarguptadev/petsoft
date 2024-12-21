"use server";

import { petFormServerSchema, petIdSchema } from "@/lib/validationSchemas";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";

// --- pet actions ---

export async function addPet(pet: unknown) {
  console.log(pet);
  const validatedPet = petFormServerSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      error: "Invalid pet data.",
    };
  }

  try {
    const newPet = await prisma.pet.create({
      data: {
        ...validatedPet.data,
      },
    });
    revalidatePath("/app", "layout");
    return {
      newPet,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Could not add pet.",
    };
  }
}
export async function editPet(petId: unknown, newPetData: unknown) {
  // validation
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormServerSchema.safeParse(newPetData);

  if (!validatedPetId.success || !validatedPet.success) {
    return {
      error: "Invalid pet data.",
    };
  }
  try {
    const updatedPet = await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
    revalidatePath("/app", "layout");
    return {
      updatedPet,
    };
  } catch (error) {
    return {
      error: "Could not edit pet.",
    };
  }
}

export async function deletePet(petId: unknown) {
  // validation
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      error: "Invalid pet data.",
    };
  }

  // database mutation
  try {
    const deletedPet = await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
    revalidatePath("/app", "layout");
    return {
      deletedPet,
    };
  } catch (error) {
    return {
      error: "Could not delete pet.",
    };
  }
}
