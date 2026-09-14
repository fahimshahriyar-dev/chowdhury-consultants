import React from "react";
import Navbar from "../components/Navbar";
import WorkShowcase from "./Home/HomeWork";

const Work: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FEFEFE] text-black flex flex-col">
      <Navbar />
      <main className="flex-1">
        <WorkShowcase
          active={true}
          bullet="Featured Work"
          title="Our Track Records"
          subtitle=""
          limit={13}
          showSeeMore={false}
        />
      </main>
    </div>
  );
};

export default Work;
