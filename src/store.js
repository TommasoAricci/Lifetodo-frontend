import { createContext, useContext, useState, useCallback } from "react";

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }) => {
  // navbar opening

  const [isOpen, setIsOpenState] = useState(false);

  const setIsOpen = useCallback((state) => {
    setIsOpenState(state);
  }, []);

  // bottom menu opening

  const [isBottomOpen, setIsBottomOpenState] = useState(false);

  const setIsBottomOpen = useCallback((state) => {
    setIsBottomOpenState(state);
  }, []);

  // thought sent

  const [thoughtSent, setThoughtSent] = useState(false);

  return (
    <StoreContext.Provider
      value={{ isOpen, setIsOpen, isBottomOpen, setIsBottomOpen, thoughtSent, setThoughtSent }}
    >
      {children}
    </StoreContext.Provider>
  );
};
