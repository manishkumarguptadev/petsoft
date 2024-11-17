"use server";

import { petFormServerSchema } from "@/lib/validationSchemas";
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
