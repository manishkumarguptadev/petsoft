import prisma from "@/prisma/client";

export const getPets = async () => {
  try {
    const pets = await prisma.pet.findMany();
    return { pets };
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch pets!" };
  }
};
