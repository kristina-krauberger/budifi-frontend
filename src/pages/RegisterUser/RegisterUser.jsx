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
    } catch (error) { }
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
    <div className="flex-grow flex items-center justify-center w-full px-4 pt-[72px] pb-8 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-sm transition-all duration-300 hover:shadow-md">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight mb-8">
          Registrierung
        </h2>
        <form className="space-y-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="first_name" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Vorname
              </label>
              <input
                type="first_name"
                id="first_name"
                name="first_name"
                placeholder="Vorname"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0EB689]/20 focus:border-[#0EB689] transition-all duration-200 text-sm font-sans bg-gray-50/30"
              />
            </div>

            <div>
              <label htmlFor="last_name" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Nachname
              </label>
              <input
                type="last_name"
                id="last_name"
                name="last_name"
                placeholder="Nachname"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0EB689]/20 focus:border-[#0EB689] transition-all duration-200 text-sm font-sans bg-gray-50/30"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                E-Mail-Adresse
              </label>
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
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0EB689]/20 focus:border-[#0EB689] transition-all duration-200 text-sm font-sans bg-gray-50/30"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Passwort
              </label>
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
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0EB689]/20 focus:border-[#0EB689] transition-all duration-200 text-sm font-sans bg-gray-50/30"
              />
            </div>
          </div>
          <button
            onClick={(event) => {
              handleRegister(event);
            }}
            type="submit"
            className="w-full bg-[#0EB689] hover:bg-[#0c9d76] text-white text-sm font-semibold py-3.5 px-4 rounded-full shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-6"
          >
            Registrieren
          </button>
          {errorEmail && <p className="text-red-500 mt-2 text-center text-xs font-medium bg-red-50 py-2.5 rounded-xl border border-red-100">{errorEmail}</p>}
          {errorPassword && <p className="text-red-500 mt-2 text-center text-xs font-medium bg-red-50 py-2.5 rounded-xl border border-red-100">{errorPassword}</p>}
        </form>
      </div>
    </div>
  );
}
