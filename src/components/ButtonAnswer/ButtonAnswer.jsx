import React from "react";

function ButtonAnswer({option, index}) {
  return (
    <div>
          <button
      className="w-full mb-4 px-6 py-3 rounded-md border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-blue-100 hover:border-blue-400 transition duration-200 ease-in-out"
      onClick={() => onClick(index)}
    >
      {option}
    </button>
    </div>
  );
}

export default ButtonAnswer;
