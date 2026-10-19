import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const CareerDetails = () => {
  const { id } = useParams();
  const [career, setCareer] = useState(null);

  useEffect(() => {
    const fetchCareer = async () => {
      const res = await API.get(`/career-hub/${id}`);
      setCareer(res.data);
    };
    fetchCareer();
  }, [id]);

  if (!career) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>{career.companyName} – {career.roleName}</h2>

      <h3>About the Company</h3>
      <p>{career.aboutCompany}</p>

      <h3>Tech Stack</h3>
      <ul>
        {career.techStack.map((tech, i) => (
          <li key={i}>{tech}</li>
        ))}
      </ul>

      <h3>Skills Required</h3>
      <ul>
        {career.skillsRequired.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>

      <h3>Recommended Free Courses</h3>
      <ul>
        {career.recommendedCourses.map((course, i) => (
          <li key={i}>
            <b>{course.title}</b> – {course.platform}  
            <br />
            <a href={course.link} target="_blank" rel="noreferrer">
              View Course
            </a>
          </li>
        ))}
      </ul>

      <h3>Official Career Page</h3>
      <a href={career.careerPageLink} target="_blank" rel="noreferrer">
        {career.careerPageLink}
      </a>
    </div>
  );
};

export default CareerDetails;