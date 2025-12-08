/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import { useState } from "react";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, removeStudentFromCampus,addStudentToCampus, allStudents} = props;
  const [selectedStudentId, setSelectedStudentId] = useState("");
  //get students NOT already enrolled at this campus
  const enrolledStudentIds = campus.students ? campus.students.map(s => s.id) : [];
  const availableStudents = allStudents ? allStudents.filter(
    student => !enrolledStudentIds.includes(student.id)
  ) : [];
  
  const handleAddStudent = () => {
    if (selectedStudentId && campus.id) {
      addStudentToCampus(selectedStudentId, campus.id);
      setSelectedStudentId(""); // Reset selection
      alert("Student added to campus! Refresh page to see changes.");

    }
  };
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <Link to={`/campus/${campus.id}/edit`}>
        <button>Edit Campus</button>
      </Link>
    <div>
        <h3>Add Student to Campus</h3>
        {availableStudents.length > 0 ? (
          <div>
            <select 
              value={selectedStudentId} 
              onChange={(e) => setSelectedStudentId(e.target.value)}
            >
              <option value="">Select a student to add...</option>
              {availableStudents.map(student => (
                <option key={student.id} value={student.id}>
                  {student.firstname} {student.lastname}
                  {student.campusId ? ` (Currently at another campus)` : " (No campus)"}
                </option>
              ))}
            </select>
            <button 
              onClick={handleAddStudent}
              disabled={!selectedStudentId}
            >
              Add to Campus
            </button>
          </div>
        ) : (
          <p>No available students to add .</p>
        )}
      </div>

      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>   
            <button onClick={() =>{ removeStudentFromCampus(student.id)
              alert("Student removed from campus! Refresh page to see changes.");
            }}>
                Remove from Campus
              </button>            
          </div>
        );
      })}
    </div>
  );
};

export default CampusView;