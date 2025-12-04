/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchStudentThunk, editStudentThunk, fetchAllCampusesThunk } from '../../store/thunks';
import EditStudentView from '../views/EditStudentView';

class EditStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      gpa: "",
      imageUrl: "",
      campusId: "",
      redirect: false,
      redirectId: null,
    };
  }

  componentDidMount() {
    const studentId = this.props.match.params.id;
    
    this.props.fetchStudent(studentId);
    
    this.props.fetchCampuses();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.student !== this.props.student && this.props.student) {
      this.populateForm(this.props.student);
    }
  }

  populateForm = (student) => {
    this.setState({
      firstname: student.firstname || "",
      lastname: student.lastname || "",
      email: student.email || "",
      gpa: student.gpa || "",
      imageUrl: student.imageUrl || "",
      campusId: student.campusId || (student.campus ? student.campus.id : ""),
    });
  }

  handleChange = event => {
    const { name, value, type } = event.target;
    
    if (type === 'number') {
      this.setState({
        [name]: value === "" ? "" : parseFloat(value)
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    
    let updatedStudent = {
      id: this.props.match.params.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      gpa: this.state.gpa || null,
      imageUrl: this.state.imageUrl || "https://via.placeholder.com/150",
      campusId: this.state.campusId || null
    };
    
    await this.props.editStudent(updatedStudent);

    this.setState({
      redirect: true,
      redirectId: this.props.match.params.id
    });
  }

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <Header />
        <EditStudentView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          student={this.state}
          campuses={this.props.allCampuses}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    student: state.student,
    allCampuses: state.allCampuses,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student)),
    fetchCampuses: () => dispatch(fetchAllCampusesThunk()),
  };
};

export default connect(mapState, mapDispatch)(EditStudentContainer);