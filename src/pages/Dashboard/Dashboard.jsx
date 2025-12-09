import "../../App.css";
import React from "react";
import CourseCard from "../../components/CourseCard/CourseCard";

function Dashboard() {
  return (
    <div className="main-content">
      <h1>DEIN DASHBOARD</h1>
      <h2>Hallo [NAME], willkommen zurück!</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 max-w-4xl mx-auto mt-10">
        <CourseCard to="/course1" title="INVESTIEREN" duration="30 Minuten" progress={45} />
        <CourseCard to="/course2" title="SPAREN" duration="30 Minuten" progress={0}/>
        <CourseCard to="/course3" title="RENTE" duration="30 Minuten" progress={0}/>
      </div>
    </div>
  );
}

export default Dashboard;
