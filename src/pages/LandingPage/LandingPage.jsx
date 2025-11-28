import React from "react";
import "./LandingPage.css";
import "../../App.css"
import hero1 from "../../assets/hero1.png";

function LandingPage() {
  return (
    <div className="main-content">
      <main className="flex items-center justify-between px-10 py-20">
        <div className="w-1/2 pr-10">
          <h1 className="text-6xl font-extrabold text-mint-500 mb-4">
            Invest smart. Learn easy.
          </h1>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mt-6 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            JETZT LOSLEGEN
          </button>
        </div>
        <img src={hero1} className="w-1/2" alt="Hero" />
      </main>
    </div>
  );
}

export default LandingPage;
