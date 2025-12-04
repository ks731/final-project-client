/*==================================================
EditStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the edit student form.
================================================== */

const EditStudentView = (props) => {
  const { handleChange, handleSubmit, student, campuses } = props;

  return (
    <div>
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input 
            type="text" 
            name="firstname"
            value={student.firstname} 
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Last Name:</label>
          <input 
            type="text" 
            name="lastname"
            value={student.lastname} 
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email"
            value={student.email} 
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>GPA:</label>
          <input 
            type="number" 
            name="gpa"
            step="0.01"
            min="0.0"
            max="4.0"
            value={student.gpa || ""} 
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label>Image URL:</label>
          <input 
            type="text" 
            name="imageUrl"
            value={student.imageUrl || ""} 
            onChange={handleChange}
            placeholder="Leave empty for default image"
          />
        </div>
        
        <div>
          <label>Campus:</label>
          <select name="campusId" value={student.campusId || ""} onChange={handleChange}>
            <option value="">No Campus</option>
            {campuses.map(campus => (
              <option key={campus.id} value={campus.id}>
                {campus.name}
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditStudentView;