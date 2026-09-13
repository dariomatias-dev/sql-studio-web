"use client";

import { createContext, useContext, useState } from "react";

type HeaderTransparencyContextType = {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
};

const HeaderTransparencyContext = createContext<HeaderTransparencyContextType | undefined>(
  undefined,
);

export const HeaderTransparencyProvider = ({
  children,
  enabled: initialEnabled = true,
}: {
  children: React.ReactNode;
  enabled?: boolean;
}) => {
  const [enabled, setEnabled] = useState(initialEnabled);

  return (
    <HeaderTransparencyContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </HeaderTransparencyContext.Provider>
  );
};

export const useHeaderTransparency = () => {
  const ctx = useContext(HeaderTransparencyContext);
  if (!ctx) {
    throw new Error("useHeaderTransparency must be used within a HeaderTransparencyProvider");
  }

  return ctx;
};
