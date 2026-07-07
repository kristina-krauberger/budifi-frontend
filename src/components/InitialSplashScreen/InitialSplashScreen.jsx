import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";

export default function InitialSplashScreen() {
  const [showColdStartMessage, setShowColdStartMessage] = useState(false);

  useEffect(() => {
    // If backend doesn't respond in 2.5 seconds, it's likely a cold start.
    const timer = setTimeout(() => setShowColdStartMessage(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F5F2] font-sans px-4">
      <div className="flex flex-col items-center max-w-sm text-center">
        {/* Pulsating Logo & Spinning Loader */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#0EB689]/20 border-t-[#0EB689] rounded-full animate-spin" />
          <img 
            src={logo} 
            alt="Budifi Logo" 
            className="absolute w-8 h-8 object-contain animate-pulse"
          />
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Buddy.Fi wird geladen
        </h3>

        <div className="min-h-[60px] flex items-center justify-center">
          <p className="text-sm text-gray-500 transition-all duration-500 ease-in-out">
            {!showColdStartMessage
              ? "Wir bereiten deine Lernreise vor..."
              : "Der Server wird gerade aufgeweckt. Das kann beim ersten Laden nach einer Pause ca. 20-30 Sekunden dauern. Gleich geht's los!"}
          </p>
        </div>
      </div>
    </div>
  );
}
