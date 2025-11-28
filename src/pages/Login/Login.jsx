import { use, useState } from "react";
import "../../App.css";
import "./Login.css";

export default function Login() {
  // e.g. {
  //     email: "Ralf@",
  //     password: "1234",
  // }

  const [email, setEmail] = useState(""); //useState Variabel
  const [password, setPassword] = useState("");

  const login = (event) => {
    // wichtiger schritt um mit default verhalten umzugehen
    // event.preventDefault()
    // PLATZHALTER - hier kommt logik für backend
    console.log("User with email:" + email);
  };

  return (
    <div className="login-dialog main-content bg-red-500">
      {/* onSubmit = Eventhandler --> führe Funktion "login" aus - Form kann weg, input reicht, dann muss im button onClick={login} rein */}
      {/* besser action als onSubmit nutzen - siehe react doku */}
      <form action={login}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email Adress"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Sign In</button>
        {/* form in kombi mit button vom typ "submit" kann ich auch per enter eingeben */}
      </form>

      <a href="/">Forgot Password</a>
    </div>
  );
}
