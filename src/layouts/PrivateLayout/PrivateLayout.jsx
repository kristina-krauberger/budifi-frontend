import HeaderPrivate from "../../components/HeaderPrivate/HeaderPrivate";
import Footer from "../../components/Footer/Footer";
import { Outlet, Navigate } from "react-router";
import { LoggedInUserContext } from "../../context/LoggedInUserContext";
import { useContext } from "react";

export default function PrivateLayout() {
  const { loggedInUser } = useContext(LoggedInUserContext);
  const token = localStorage.getItem("authToken");

  if (token && !loggedInUser) {
    return <p>Loading...</p>;
  }
  if (!token && !loggedInUser) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderPrivate /> 
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
