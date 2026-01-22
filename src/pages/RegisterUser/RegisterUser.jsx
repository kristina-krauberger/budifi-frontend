import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { loginUser, fetchLoggedInUser } from "../../api/auth.api";
import { LoggedInUserContext } from "../../context/LoggedInUserContext";


export default function Register() {
//   const navigate = useNavigate();

//   // Local state for form input fields
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Handle register form submission
//   const handleRegister = async (event) => {
//     event.preventDefault();
//     try {
//       // Send register request to backend
//       const response = await registerUser(email, password);
//       console.log("Login erfolgreich, Token:", response.token);

//       // Store JWT token in local storage for authentication
//       localStorage.setItem("authToken", response.token);

//       const user = await fetchLoggedInUser();
//       setLoggedInUser(user);

//       navigate("/login");
//     } catch (error) {
//       setLoginError(true);
//       console.error("Registration fehlgeschlagen", error);
//     }
//   };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-black">
          🚧 Registrierung kommt bald – unser Entwicklerteam braucht noch Kaffee
        </h2>
        {/* <form className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Adresse"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Passwort"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-passord"
              className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
          </div>
          <button
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                "Registrierung ist noch nicht verfügbar – komm bald wieder!",
              );
            }}
            type="submit"
            className="px-4 py-2 w-full max-w-md font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 cursor-pointer"
          >
            Registieren
          </button>
        </form> */}
      </div>
    </div>
  );
}
