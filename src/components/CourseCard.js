import React from 'react';
import './CourseCard.css'; // Import your styles

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} className="course-image" />
      <div className="course-info">
        <h2 className="course-title">{course.title}</h2>
        <p className="course-description">{course.description}</p>
      </div>
    </div>
  );
};

export default CourseCard;
