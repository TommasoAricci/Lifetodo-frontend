import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

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
  const [thoughtSent, setThoughtSent] = useState(false);
  const [thoughtTitle, setThoughtTitle] = useState("");
  const [thoughtId, setThoughtId] = useState("");
  const [thoughtDescription, setThoughtDescription] = useState("");
  const [thoughtEdit, setThoughtEdit] = useState(false);
  const [thoughtView, setThoughtView] = useState(false);

  // checkbox

  const [newCheckboxOpen, setNewCheckboxOpen] = useState(false);
  const [checkboxSent, setCheckboxSent] = useState(false);
  const [checkboxEdit, setCheckboxEdit] = useState(false);
  const [checkboxTitle, setCheckboxTitle] = useState("");
  const [checkboxItems, setCheckboxItems] = useState([]);
  const [checkboxId, setCheckboxId] = useState("");

  // login - logout

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => {
        localStorage.removeItem("token");
        setToken(null);
        alert("Your session has expired. You have been logged out.");
      }, 600000);

      return () => clearTimeout(timer);
    }
  }, [token]);

  // current user

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/currentuser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Dati dell'utente:", data.user);
          setUserData(data.user);
        } else {
          console.error("Errore:", data.message);
        }
      })
      .catch((error) => console.error("Errore:", error));
  }, [token]);

  // account

  const [editMode, setEditMode] = useState(false);
  const [edited, setEdited] = useState(false);

  return (
    <StoreContext.Provider
      value={{
        // navbar
        isOpen,
        setIsOpen,
        // plus button
        isBottomOpen,
        setIsBottomOpen,
        // thought
        thoughtSent,
        setThoughtSent,
        thoughtEdit,
        setThoughtEdit,
        thoughtTitle,
        setThoughtTitle,
        thoughtDescription,
        setThoughtDescription,
        thoughtId,
        setThoughtId,
        newThoughtOpen,
        setNewThoughtOpen,
        thoughtView,
        setThoughtView,
        // checkbox
        checkboxSent,
        setCheckboxSent,
        newCheckboxOpen,
        setNewCheckboxOpen,
        checkboxEdit,
        setCheckboxEdit,
        checkboxTitle,
        setCheckboxTitle,
        checkboxItems,
        setCheckboxItems,
        checkboxId,
        setCheckboxId,
        // login
        userData,
        setUserData,
        token,
        setToken,
        username,
        setUsername,
        password,
        setPassword,
        fullName,
        setFullName,
        // account
        editMode,
        setEditMode,
        edited,
        setEdited,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
