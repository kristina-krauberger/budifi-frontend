import React from "react";

function ButtonNextLesson() {
  return (
    <div className="flex justify-center gap-4">
      <button className="w-44 py-3 rounded-md font-semibold bg-blue-400 hover:bg-emerald-600 text-white shadow-sm hover:shadow-md transition-all duration-200">
        Weiter geht's!
      </button>
    </div>
  );
}

export default ButtonNextLesson;
