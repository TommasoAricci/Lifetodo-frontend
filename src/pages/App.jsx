import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../style/App.scss";
import Navbar from "../components/Navbar";
import { useStore } from "../store";

export default function App() {

  const { token, setToken } = useStore();
  const navigate = useNavigate();

    useEffect(() => {
      if (token) {
        const timer = setTimeout(() => {
          localStorage.removeItem("token");
          setToken(null);
          navigate("/login");  // Reindirizza direttamente alla pagina di login
          alert("Your session has expired. You have been logged out.");
        }, 6000);
    
        return () => clearTimeout(timer);
      }
    }, [token, navigate, setToken]);

  return (
    <>
      <Navbar />
      <div className="mainAbout mainApp">
        <h1 id="app-h1">
          Welcome to my <br /><span> web developer portfolio</span>
        </h1>
      </div>
      <div className="aboutDescription appDescription"></div>
    </>
  );
}
