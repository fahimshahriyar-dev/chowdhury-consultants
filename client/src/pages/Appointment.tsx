import React from "react";
import Navbar from "../components/Navbar";
import Cta from "./Home/Cta";
import Footer from "../components/Footer";

const Appointment: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FEFEFE] flex flex-col justify-between">
      <Navbar />
      <div className="flex-1">
        <Cta active={true} />
      </div>
      <Footer />
    </div>
  );
};

export default Appointment;
