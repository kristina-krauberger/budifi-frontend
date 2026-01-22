// LoggedInUserProvider
// ---------------------
// This provider is responsible for storing and exposing
// the currently authenticated user across the entire app.
//
// It checks for an auth token in localStorage when the app starts.
// If a token exists: it fetches the logged-in user's data from the backend
// and saves it in global state so any component can access it via context.
import { LoggedInUserContext } from "./LoggedInUserContext";
import { useState, useEffect } from "react";
import { fetchLoggedInUser } from "../api/auth.api";

export function LoggedInUserProvider({ children }) {
  // Global state holding the currently logged-in user.
  const [loggedInUser, setLoggedInUser] = useState(null);
  console.log("GLOBAL LOGGED IN USER SAFED:", loggedInUser);

  // On app start, check if a token exists in localStorage.
  // If yes, request the user data from the backend and
  // store it in the global context state.
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchLoggedInUser()
        .then((user) => {
          setLoggedInUser(user); // set global 
          console.log("LOGGED IN USER NACH APP STAR & REDIRECT", user)
        })
        .catch((err) => {
          console.error("Token ungültig oder Serverproblem:", err);
          setLoggedInUser(null); 
        });
    }
  }, []);

  // Provide loggedInUser and setLoggedInUser to the entire app
  // via React Context
  return (
    <LoggedInUserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </LoggedInUserContext.Provider>
  );
}
