import React from "react";
import "../../App.css";
import ButtonBack from "../ButtonBack/ButtonBack";


function LessonFooter() {
  return (
    <nav className="main-content">
      <div className="bg-neutral-100 border border-gray-300 rounded-lg shadow px-4 py-1">
        <ul className="flex justify-between gap-2 text-sm">
          <li>
            <ButtonBack/></li>
          
         
          <li className="mb-6 inline-flex mr-7 self-start items-center justify-center w-10 h-10 rounded-full bg-neutral-200 hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 text-gray-700">
            →
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default LessonFooter;
