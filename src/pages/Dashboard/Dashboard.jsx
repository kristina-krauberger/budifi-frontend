import "../../App.css";
import React from "react";
import CourseCard from "../../components/CourseCard/CourseCard";

function Dashboard() {
  return (
    <div className="main-content">
      <h1>DEIN DASHBOARD</h1>
      <h2>Hallo [NAME], willkommen zurück!</h2>
      <CourseCard title="INVESTIEREN" duration="30 Minuten" />
      <div className="w-full bg-neutral-quaternary rounded-full">
        <div className="w-full bg-neutral-quaternary rounded-full">
          <div
            className="bg-brand text-xs font-medium text-white text-center p-0.5 leading-none rounded-full h-4 flex items-center justify-center"
            style={{ width: "45%" }}
          >
            {" "}
            45%
          </div>
        </div>
      </div>
      <CourseCard title="SPAREN" duration="30 Minuten" />
           <div className="w-full bg-neutral-quaternary rounded-full">
        <div className="w-full bg-neutral-quaternary rounded-full">
          <div
            className="bg-brand text-xs font-medium text-white text-center p-0.5 leading-none rounded-full h-4 flex items-center justify-center"
            style={{ width: "0%" }}
          >
            {" "}
            0%
          </div>
        </div>
      </div>
      <CourseCard title="RENTE" duration="30 Minuten" />
           <div className="w-full bg-neutral-quaternary rounded-full">
        <div className="w-full bg-neutral-quaternary rounded-full">
          <div
            className="bg-brand text-xs font-medium text-white text-center p-0.5 leading-none rounded-full h-4 flex items-center justify-center"
            style={{ width: "0%" }}
          >
            {" "}
            0%
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
