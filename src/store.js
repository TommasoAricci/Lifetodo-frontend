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

  // thought open

  const [newThoughtOpen, setNewThoughtOpen] = useState(false);

  // thought sent

  const [thoughtSent, setThoughtSent] = useState(false);
  const [thoughtTitle, setThoughtTitle] = useState("");
  const [thoughtId, setThoughtId] = useState("");
  const [thoughtDescription, setThoughtDescription] = useState("");

  // thought edit

  const [thoughtEdit, setThoughtEdit] = useState(false);

  // checkbox open

  const [newCheckboxOpen, setNewCheckboxOpen] = useState(false);

  // checkbox sent

  const [checkboxSent, setCheckboxSent] = useState(false);

  return (
    <StoreContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isBottomOpen,
        setIsBottomOpen,
        thoughtSent,
        setThoughtSent,
        thoughtEdit,
        setThoughtEdit,
        checkboxSent,
        setCheckboxSent,
        newThoughtOpen,
        setNewThoughtOpen,
        newCheckboxOpen,
        setNewCheckboxOpen,
        thoughtTitle,
        setThoughtTitle,
        thoughtDescription,
        setThoughtDescription,
        thoughtId,
        setThoughtId
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
