import { useEffect, useState } from "react";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // or loading screen
  }

  return <>{children}</>;
};
