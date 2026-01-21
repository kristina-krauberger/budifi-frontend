import { LoggedInUserContext } from "./LoggedInUserContext";
import { useState, useEffect } from "react";
import { fetchLoggedInUser } from "../api/auth.api";

export function LoggedInUserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  console.log("GLOBAL LOGGED IN USER SAFED:", loggedInUser);

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
