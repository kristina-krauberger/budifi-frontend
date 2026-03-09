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
    colorClass = "bg-[#DCEFE3] border-[#7FAF95]";
  } else if (wasClicked && !isCorrect) {
    colorClass = "bg-[#F5EFEF] border-[#B86A6A] text-[#7A2E2E]";
  }

  return (
    <div>
      <button
        className={`w-full mb-4 px-6 py-3 rounded-md border ${colorClass} text-gray-800 shadow-sm ${hoverClass} transition duration-200 ease-in-out`}
        onClick={onClick}
      >
        {optionAnswer}
      </button>
    </div>
  );
}

export default ButtonAnswer;
