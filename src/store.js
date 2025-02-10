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

  // view

  const [viewContent, setViewContent] = useState(false);

  // thought open

  const [newThoughtOpen, setNewThoughtOpen] = useState(false);
  const [thoughtSent, setThoughtSent] = useState(false);
  const [thoughtTitle, setThoughtTitle] = useState("");
  const [thoughtId, setThoughtId] = useState("");
  const [thoughtDescription, setThoughtDescription] = useState("");
  const [thoughtEdit, setThoughtEdit] = useState(false);

  // checkbox

  const [newCheckboxOpen, setNewCheckboxOpen] = useState(false);
  const [checkboxSent, setCheckboxSent] = useState(false);
  const [checkboxEdit, setCheckboxEdit] = useState(false);
  const [checkboxTitle, setCheckboxTitle] = useState("");
  const [checkboxItems, setCheckboxItems] = useState([]);
  const [checkboxId, setCheckboxId] = useState("");

  // music

  const [newSongOpen, setNewSongOpen] = useState(false);
  const [songSent, setSongSent] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [songData, setSongData] = useState(null);
  const [songId, setSongId] = useState("");
  const [songToken, setSongToken] = useState("");
  const [songDbTitle, setSongDbTitle] = useState("");
  const [deletedSong, setDeletedSong] = useState(false);
  const [songsToChoose, setSongsToChoose] = useState([]);

  // books

  const [newBookOpen, setNewBookOpen] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [bookSent, setBookSent] = useState(false);
  const [bookData, setBookData] = useState(null);
  const [bookId, setBookId] = useState("");
  const [booksToChoose, setBooksToChoose] = useState([]);

  // login - logout

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (token) {
      const warningTimer = setTimeout(() => {
        alert("Your session is about to expire. You will be logged out soon.");
      }, 54000000);

      const logoutTimer = setTimeout(() => {
        localStorage.removeItem("token");
        setToken(null);
        alert("Your session has expired. You have been logged out.");
      }, 60000000);

      return () => {
        clearTimeout(warningTimer);
        clearTimeout(logoutTimer);
      };
    }
  }, [token]);

  // current user

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/currentuser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
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
        viewContent,
        setViewContent,
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
        // music
        songSent,
        setSongSent,
        newSongOpen,
        setNewSongOpen,
        songTitle,
        setSongTitle,
        songData,
        setSongData,
        songId,
        setSongId,
        songToken,
        setSongToken,
        songDbTitle,
        setSongDbTitle,
        deletedSong,
        setDeletedSong,
        songsToChoose,
        setSongsToChoose,
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
        // books
        newBookOpen,
        setNewBookOpen,
        bookTitle,
        setBookTitle,
        bookSent,
        setBookSent,
        bookData,
        setBookData,
        bookId,
        setBookId,
        booksToChoose,
        setBooksToChoose,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
