/*==================================================
EditCampusView.js
================================================== */

const EditCampusView = (props) => {
  const { handleChange, handleSubmit, campus } = props;

  return (
    <div>
      <h1>Edit Campus</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Campus Name:</label>
          <input 
            type="text" 
            name="name"
            value={campus.name} 
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Address:</label>
          <input 
            type="text" 
            name="address"
            value={campus.address} 
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Description:</label>
          <textarea 
            name="description"
            value={campus.description} 
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label>Image URL:</label>
          <input 
            type="text" 
            name="imageUrl"
            value={campus.imageUrl} 
            onChange={handleChange}
            placeholder="Leave empty for default image"
          />
        </div>
        
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCampusView;