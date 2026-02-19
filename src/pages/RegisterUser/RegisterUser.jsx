import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../../api/auth.api";

export default function Register() {
  const navigate = useNavigate();

  // Local state for form input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  // Handles form submission, sends user data to backend, and shows validation errors (e.g., duplicate email)
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      // Send register request to backend
      const response = await registerUser({
        firstName,
        lastName,
        email,
        password,
      });
      if (response.error) {
        if (response.error.toLowerCase().includes("email")) {
          setErrorEmail("Unter dieser Email existiert bereits ein User.");
        }
        return;
      }
      navigate("/login");
    } catch (error) {}
  };

  // Email input validation through regex
  function validateEmail(email) {
    const validEmail = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    if (!validEmail) {
      setErrorEmail("Richtige Email angeben");
    } else {
      setErrorEmail("");
    }
  }

  // Password input validation through regex
  function validatePassword(password) {
    if (password.length < 3) {
      setErrorPassword("Passwort muss mind 3 Zeichen lang sein.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorPassword("Passwort muss mind 1 Großbuchstaben haben.");
      return;
    }
    setErrorPassword("");
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-black">
          Registrierung
        </h2>
        <form className="space-y-4">
          <div>
            <input
              type="first_name"
              id="first_name"
              name="first_name"
              placeholder="Vorname"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
            <input
              type="last_name"
              id="last_name"
              name="last_name"
              placeholder="Nachname"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Adresse"
              value={email}
              onChange={(event) => {
                const value = event.target.value;
                setEmail(value);
                validateEmail(value);
              }}
              required
              style={{ border: errorEmail && "1px solid red", outline: "none" }}
              className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Passwort"
              value={password}
              onChange={(event) => {
                const value = event.target.value;
                setPassword(value);
                validatePassword(value);
              }}
              required
              style={{
                border: errorPassword && "1px solid red",
                outline: "none",
              }}
              className="w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
            />
          </div>
          <button
            onClick={(event) => {
              handleRegister(event);
            }}
            type="submit"
            className="px-4 py-2 w-full max-w-md font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 cursor-pointer"
          >
            Registieren
          </button>
          {errorEmail && <p className="text-red-500">{errorEmail}</p>}
          {errorPassword && <p className="text-red-500">{errorPassword}</p>}
        </form>
      </div>
    </div>
  );
}
