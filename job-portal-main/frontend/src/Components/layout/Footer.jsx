import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import {   FaLinkedin, FaGithub} from "react-icons/fa";


const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By JobNest group </div>
      <div>
        <Link to={"https://www.linkedin.com/in/parshva-shah-72528020b/"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://github.com/otakuparshva"} target="_blank">
          <FaGithub />
        </Link>
   
      </div>
    </footer>
  );
};

export default Footer;