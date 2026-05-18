import React from "react";

function ButtonAnswer({
  optionAnswer,
  index,
  onClick,
  wasClicked,
  isCorrect,
  givenAnswer,
}) {
  let colorClass = "bg-white border-gray-200"; // neutral
  const isAnswered = givenAnswer !== undefined;
  const hoverClass = !isAnswered
    ? "hover:bg-gray-100 hover:border-gray-300"
    : "";

  if (wasClicked && isCorrect) {
    colorClass = "bg-[#F0FAF6] border-[#0EB689] text-[#0a7a5c]";
  } else if (wasClicked && !isCorrect) {
    colorClass = "bg-red-50 border-red-300 text-red-700";
  }

  return (
    <div>
      <button
        className={`w-full mb-3 px-5 py-3 rounded-xl border ${colorClass} text-gray-800 text-sm shadow-sm ${hoverClass} transition duration-200 ease-in-out`}
        onClick={onClick}
      >
        {optionAnswer}
      </button>
    </div>
  );
}

export default ButtonAnswer;
