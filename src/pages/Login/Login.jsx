import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Access the global context to set the currently logged-in user
  const { setLoggedInUser } = useContext(LoggedInUserContext);

  // Handle login form submission
  const handleLogin = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setLoginError(false);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center w-full px-4 pt-[72px] pb-8 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-sm transition-all duration-300 hover:shadow-md">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight mb-8">
          Zurück zu deiner Lernreise
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                E-Mail-Adresse
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="dein.name@beispiel.de"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                disabled={isSubmitting}
                autoComplete="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0EB689]/20 focus:border-[#0EB689] transition-all duration-200 text-sm font-sans bg-gray-50/30 disabled:opacity-60"
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
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                disabled={isSubmitting}
                autoComplete="current-password"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0EB689]/20 focus:border-[#0EB689] transition-all duration-200 text-sm font-sans bg-gray-50/30 disabled:opacity-60"
              />
            </div>
          </div>

          {loginError && (
            <p className="text-red-500 text-xs font-medium text-center bg-red-50 py-2.5 rounded-xl border border-red-100">
              E-Mail oder Passwort ist nicht korrekt.
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0EB689] hover:bg-[#0c9d76] disabled:bg-[#0EB689]/75 text-white text-sm font-semibold py-3.5 px-4 rounded-full shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-6 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Einloggen...</span>
              </>
            ) : (
              <>
                Jetzt einloggen <span>→</span>
              </>
            )}
          </button>
        </form>

        {/* Option to navigate to registration */}
        <p className="text-xs text-gray-400 text-center mt-8">
          Noch kein Konto?{" "}
          <Link 
            to="/registrieren" 
            className={`font-bold text-[#0EB689] hover:underline ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
          >
            Jetzt registrieren
          </Link>
        </p>
      </div>
    </div>
  );
}
