import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import BackgroundPattern from "@/components/BackgroundPattern";
import PetContextProvider from "@/contexts/PetContextProvider";
import { getPets } from "@/prisma/pet";
import { Pet } from "@prisma/client";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pets } = await getPets();

  return (
    <>
      <BackgroundPattern />

      <div className="mx-auto flex min-h-screen max-w-[1050px] flex-col px-4">
        <AppHeader />
        <PetContextProvider data={pets as Pet[]}>{children}</PetContextProvider>
        <AppFooter />
      </div>
    </>
  );
}
