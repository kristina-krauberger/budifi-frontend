// import Logo from "../../assets/logo.png";
import "./Header.css";
import { useState } from "react";
import LoginDialog from "../LoginDialog/LoginDialog";

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="header">
      {/* <img className="logo" src={Logo} alt="Logo" /> */}
      <span>BudyFi</span>
      <nav>
        <button>Registrieren</button>
        <button onClick={() => setIsLoginOpen(true)}>Login</button>
      </nav>
      {isLoginOpen ? <LoginDialog /> : null}
    </div>
  );
}
