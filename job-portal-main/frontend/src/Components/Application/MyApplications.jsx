import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/application/${
            user.role === "Employer" ? "employer" : "jobseeker"
          }/getall`,
          { withCredentials: true }
        );
        setApplications(response.data.applications);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, [isAuthorized, user, navigate]);

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`, { withCredentials: true });
      setApplications((prevApplications) => prevApplications.filter(application => application._id !== id));
      toast.success("Application deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="my_applications page">
      <div className="cont">
        <h1>{user?.role === "Job Seeker" ? "My Applications" : "Applications From Job Seekers"}</h1>
        {applications.length === 0 ? (
          <h4>No Applications Found</h4>
        ) : (
          applications.map((element) => (
            <div key={element._id} className="application">
              <h2>{element.name}</h2>
              <p>Email: {element.email}</p>
              <p>Phone: {element.phone}</p>
              <p>Address: {element.address}</p>
              <p>Cover Letter: {element.coverLetter}</p>
              {user?.role === "Job Seeker" && (
                <button onClick={() => deleteApplication(element._id)}>Delete Application</button>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default MyApplications;
