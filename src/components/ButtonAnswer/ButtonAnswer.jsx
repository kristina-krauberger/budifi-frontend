import React from "react";

function ButtonAnswer({optionAnswer, index, onClick, wasClicked, isCorrect, givenAnswer}) {
  let colorClass = "bg-white border-gray-300"; // neutral
  const isAnswered = givenAnswer !== undefined;
  const hoverClass = !isAnswered ? "hover:bg-blue-100 hover:border-blue-400" : "";

  if (wasClicked && isCorrect) {
     colorClass = "bg-green-300 border-green-500";
  } else if (wasClicked && !isCorrect) {colorClass = "bg-red-300 border-red-500"}

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
