/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      
      {student.imageUrl && (
        <img 
          src={student.imageUrl} 
          alt={`${student.firstname} ${student.lastname}`} 
          style={{ maxWidth: "300px" }}
        />
      )}
      
      <p><strong>Email:</strong> {student.email}</p>
      
      <p><strong>GPA:</strong> {student.gpa || "N/A"}</p>
      
      <h3>
        Campus: 
        {student.campus ? (
          <Link to={`/campus/${student.campus.id}`}>
            {student.campus.name}
          </Link>
        ) : (
          "No Campus Assigned"
        )}
      </h3>
      
      <Link to={`/student/${student.id}/edit`}>
        <button>Edit Student</button>
      </Link>
    </div>
  );
};

export default StudentView;