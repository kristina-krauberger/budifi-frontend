import React from "react";
import { useNavigate } from "react-router";

function ButtonDashboard() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dashboard")}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-neutral-300 text-gray-600 hover:bg-neutral-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 transition"
      aria-label="Zurück"
    >
      ←
    </button>
  );
}

export default ButtonDashboard;
