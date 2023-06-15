import React, {
  createContext,
  PropsWithChildren,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import { useState } from "react";
import { BrandCSS } from "./@types";

interface AppContext {
  brands: BrandCSS[];
  setBrands: Dispatch<SetStateAction<BrandCSS[]>>;
}

export const AppContext = createContext<AppContext>({
  brands: [],
  setBrands: () => {
    console.error("setBrands used outside context");
  },
});

const useAppHook = () => {
  const [brands, setBrands] = useState<BrandCSS[]>([]);
  return { brands, setBrands };
};

const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppContext.Provider value={useAppHook()}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
