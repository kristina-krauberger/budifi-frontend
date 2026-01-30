import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { loginUser, fetchLoggedInUser } from "../../api/auth.api";
import { LoggedInUserContext } from "../../context/LoggedInUserContext";

export default function Login() {
  // e.g. {
  //     email: "test@gmail.com",
  //     password: "123",
  // }

  const navigate = useNavigate();

  // Local state for form input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Access the global context to set the currently logged-in user
  const { setLoggedInUser } = useContext(LoggedInUserContext);

  // Handle login form submission
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Send login request to backend
      const response = await loginUser(email, password);
      console.log("Login erfolgreich, Token:", response.token);

      // Save user email to global context
      setLoggedInUser(email);

      // Store JWT token in local storage for authentication
      localStorage.setItem("authToken", response.token);

      const user = await fetchLoggedInUser();
      setLoggedInUser(user);

      navigate("/dashboard");
    } catch (error) {
      setLoginError(true);
      console.error("Login fehlgeschlagen", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Zurück zu deiner Lernreise
        </h2>
        {/* onSubmit = Eventhandler --> führe Funktion "login" aus - Form kann weg, input reicht, dann muss im button onClick={login} rein */}
        {/* besser action als onSubmit nutzen - siehe react doku */}
        <form onSubmit={handleLogin} className="space-y-4">
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
          {loginError && (
            <p className="text-red-600 text-sm italic text- text-center">
              E-Mail oder Passwort falsch.
            </p>
          )}
          <button
            type="submit"
            className="px-4 py-2 w-full max-w-md font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 cursor-pointer"
          >
            Login
          </button>
          {/* form in kombi mit button vom typ "submit" kann ich auch per enter eingeben */}
        </form>
      </div>
    </div>
  );
}
