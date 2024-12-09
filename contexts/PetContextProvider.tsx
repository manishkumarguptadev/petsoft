"use client";

import { addPet, editPet } from "@/actions/actions";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
import { createContext, useState } from "react";
import { toast } from "sonner";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet["id"] | null;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleAddPet: (petData: PetEssentials) => Promise<void>;
  handleEditPet: (petId: Pet["id"], newPetData: PetEssentials) => Promise<void>;
  handleChangeSelectedPetId: (id: Pet["id"]) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  // state
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  const handleAddPet = async (petData: PetEssentials) => {
    const { newPet, error } = await addPet(petData);
    if (error) {
      toast.warning(error);
      return;
    }
    if (newPet) {
      setPets((prev) => [...prev, newPet]);
    }
  };

  const handleEditPet = async (petId: Pet["id"], newPetData: PetEssentials) => {
    const { updatedPet, error } = await editPet(petId, newPetData);
    if (error) {
      toast.warning(error);
      return;
    }
    if (updatedPet) {
      const updatedPets = pets.map((pet) => {
        if (pet.id === updatedPet.id) return updatedPet;
        return pet;
      });
      console.log(updatedPets);
      setPets(updatedPets);
    }
  };

  const handleChangeSelectedPetId = (id: Pet["id"]) => {
    setSelectedPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        numberOfPets,
        handleAddPet,
        handleEditPet,
        handleChangeSelectedPetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
