import { useContext } from "react";
import { LoggedInUserContext } from "../../context/LoggedInUserContext";
import { Link, useNavigate } from "react-router";
import logo from "../../assets/logo.png";

function HeaderPrivate() {
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(LoggedInUserContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setLoggedInUser(null);
    navigate("/");
  };

  return (
    <nav className="fixed w-full z-20 top-0 start-0 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl flex items-center justify-between mx-auto px-6 py-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src={logo}
            className="h-10 w-10 rounded-full"
            alt="Buddy.Fi Logo"
          />
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            Buddy.Fi
          </span>
        </button>
        <button
          onClick={handleLogout}
          type="button"
          className="py-2 px-4 text-sm font-medium text-gray-600 bg-white rounded-full border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default HeaderPrivate;
