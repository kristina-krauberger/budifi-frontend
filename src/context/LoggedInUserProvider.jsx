import { LoggedInUserContext } from "./LoggedInUserContext";
import { useState } from "react";

export function LoggedInUserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  console.log("GLOBAL LOGGED IN USER SAFED:", loggedInUser)

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
