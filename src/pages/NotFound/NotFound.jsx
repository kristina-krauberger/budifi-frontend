/**
 * NotFound component displays a 404 error page when a user navigates to a non-existent route.
 * It redirects the user back to the appropriate home page depending on their authentication status.
 * - Logged-in users are redirected to '/dashboard'
 * - Visitors are redirected to the public landing page '/'
 */
import React from "react";
import "../../App.css";
import { useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import { LoggedInUserContext } from "../../context/LoggedInUserContext";

function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedInUser } = useContext(LoggedInUserContext);

  // Navigate to dashboard or home depending on auth state of user
  const handleBack = () => {
    if (loggedInUser) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-white px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Oops! Seite nicht gefunden
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Die Seite, die du suchst, scheint sich versteckt zu haben – oder sie
        existiert nicht.
      </p>
      <button
        onClick={handleBack}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-neutral-300 text-gray-600 hover:bg-neutral-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 transition"
        aria-label="Zurück"
      >
        ←
      </button>
    </div>
  );
}

export default NotFound;
