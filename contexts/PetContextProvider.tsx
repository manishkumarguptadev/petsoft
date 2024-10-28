"use client";

import { Pet } from "@prisma/client";
import { createContext, useState } from "react";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  // state
  const [pets, setPets] = useState(data);

  return (
    <PetContext.Provider
      value={{
        pets,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
