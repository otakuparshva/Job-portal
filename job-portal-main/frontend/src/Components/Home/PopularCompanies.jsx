import React from "react";
import { FaMicrosoft, FaApple } from 'react-icons/fa';
import { SiAdobe } from 'react-icons/si';


const PopularCompanies = () => {
 

const companies = [
  {
    id: 1,
    title: "Microsoft",
    location: "Mumbai, India",
    openPositions: 10,
    icon: <FaMicrosoft />,
  },
  {
    id: 2,
    title: "Adobe",
    location: "Noida, India",
    openPositions: 5,
    icon: <SiAdobe />,
  },
  {
    id: 3,
    title: "Apple",
    location: "Delhi, India",
    openPositions: 20,
    icon: <FaApple />,
  },
];

  return (
    <div className="companies">
      <div className="container">
        <h3>TOP COMPANIES</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;