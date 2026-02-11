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
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
        >
          <img
            src={logo}
            className="h-12 w-12 rounded-full"
            alt="Buddy.Fi Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Buddy.Fi
          </span>
        </button>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            onClick={handleLogout}
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
}

export default HeaderPrivate;
