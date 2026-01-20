import { useState } from "react";
import { loginUser } from "../../api/auth.api";
import "./Login.css";

export default function Login() {
  // e.g. {
  //     email: "test@gmail.com",
  //     password: "123",
  // }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(email, password);
      console.log("Login erfolgreich, Token:", response.token);
      //TODO: Token im local storage speichern
    } catch (error) {
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
              autocomplete="email"
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
            type="submit"
            className="px-4 py-2 w-full max-w-md font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 cursor-pointer"
          >
            Login
          </button>
          {/* form in kombi mit button vom typ "submit" kann ich auch per enter eingeben */}
        </form>
        <a
          href="#"
          className="text-sm text-indigo-600 hover:underline text-center block"
        >
          Passwort vergessen?
        </a>
      </div>
    </div>
  );
}
