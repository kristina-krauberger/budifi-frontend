import React from "react";
import "./Test.css";


function Test() {

    // JavaScript Welt über dem return 

  return (

    // Layout Welt im return
    <div className="test">
      <h1>TEST SECTION TAILWIND</h1>
      <div className="flex justify-center dark:bg-blue-950">
        <ul>
          <li className="text-black dark:text-white">hier ist darkmode angewand </li>
          <li>das ist eine flex container</li>
          <li className="text-brand, hover:text-brand">activ und hover</li>
        </ul>
      </div>
    </div>
  );
}

export default Test;
// TODO: Datei löschen
