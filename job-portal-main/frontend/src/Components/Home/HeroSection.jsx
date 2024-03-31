import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "3000",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "500",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2500",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1000",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
  <div className="container">
    <div className="title">
      <h1>Find Your Dream Job with CareerHub</h1>
      <p>
        Explore opportunities that match your skills and interests on CareerHub. Your next career move starts here!
      </p>
    </div>
    <div className="image">
      <img src="/heroS.jpg" alt="hero" />
    </div>
  </div>
  <div className="details">
    {details.map(({ id, icon, title, subTitle }) => (
      <div className="card" key={id}>
        <div className="icon">{icon}</div>
        <div className="content">
          <p>{title}</p>
          <p>{subTitle}</p>
        </div>
      </div>
    ))}
  </div>
</div>

    </>
  );
};

export default HeroSection;