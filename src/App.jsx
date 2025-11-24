import "./App.css";
import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/datenschutz" element={<h1>Datenschutz TEST</h1>} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
