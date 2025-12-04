/*==================================================
EditCampusContainer.js
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';
import EditCampusView from '../views/EditCampusView';

class EditCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      redirect: false,
      redirectId: null,
    };
  }

  componentDidMount() {
    
    const campusId = this.props.match.params.id;
    
   
    if (!this.props.campus || this.props.campus.id !== parseInt(campusId)) {
      this.props.fetchCampus(campusId);
    } else {
      
      this.populateForm(this.props.campus);
    }
  }

  componentDidUpdate(prevProps) {
    
    if (prevProps.campus !== this.props.campus && this.props.campus) {
      this.populateForm(this.props.campus);
    }
  }

  populateForm = (campus) => {
    this.setState({
      name: campus.name || "",
      address: campus.address || "",
      description: campus.description || "",
      imageUrl: campus.imageUrl || "",
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    
    let updatedCampus = {
      id: this.props.match.params.id,
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      imageUrl: this.state.imageUrl || "https://via.placeholder.com/150"
    };
    
    
    await this.props.editCampus(updatedCampus);

    
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
      return <Redirect to={`/campus/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <Header />
        <EditCampusView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          campus={this.state}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus, 
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
  };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);