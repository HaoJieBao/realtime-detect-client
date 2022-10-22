import { PropsWithChildren } from "react";
import { MainNavigation } from "./MainNavigation";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-[#1A1B1D]">
      <MainNavigation />
      {children}
    </div>
  );
};

export default MainLayout;
