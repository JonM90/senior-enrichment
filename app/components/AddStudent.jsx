import React, { Component } from 'react';
import axios from 'axios';

export default class AddStudent extends Component {
  constructor(props) {
    super(props)
    this.state = { student: {}, campusChoice: []}

    this.fetchCampuses = this.fetchCampuses.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.editStudent = this.editStudent.bind(this);
  }

  fetchCampuses() {
    axios.get('/api/campuses')
    .then(res =>  res.data )
    .then( campusChoice => this.setState( {campusChoice} ) )
  }

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({ [name]: val })
  }

  handleSubmit(e) {
    let addOrEdit = this.props.match ? 'add' : 'edit';
    addOrEdit === 'add' ? this.handleAdd() : this.handleEdit();
    e.preventDefault();
  }

  handleAdd() {
    const newStud = Object.assign({}, {name: this.state.name, email: this.state.email, image: this.state.image, campusId: this.state.campusId});
    this.addStudent(newStud);
  }

  addStudent(newStud) {
    axios.post('/api/students/addStudent', newStud)
    .then(res => res.data)
    .then( stud => this.props.history.push(`/students/${stud.id}`) )
  }

  handleEdit() {
    let studId = this.state.student.id;
    let name = this.state.name ? this.state.name : this.state.student.name
    let email = this.state.email ? this.state.email : this.state.student.email
    let image = this.state.image ? this.state.image : this.state.student.image
    let campusId = +(this.state.campusId ? this.state.campusId : this.state.student.campusId)
    this.editStudent({name, email, image, campusId}, studId);
  }

  editStudent(stud, id) {
    axios.put(`/api/students/${id}/edit`, stud)
    .then(res => res.data)
    .then(student => {
      this.setState({ student });
      location.replace(`/students/${id}`)
    })
  }

  componentDidMount() {
    this.fetchCampuses();
  }

  componentWillReceiveProps(nextProps) {
    const student = nextProps.student;
    this.setState( {student} );
    let prevCamp = nextProps.student.campus
    this.setState({prevCamp})
  }

  render() {
    let list = this.state.campusChoice;
    const student = this.state.student;
    //For editStudent default option tag & rerendering on changes
    const defaultVal = this.state.prevCamp;
    let newVal = this.state.campusId

    return (
      <div >
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          Name:
          <input type="text" name="name" placeholder={student.name} />
          Email:
          <input type="email" name="email" placeholder={student.email} />
          Image Link:
          <input type="text" name="image" placeholder={student.image} />
          Desired Campus
          <select name="campusId" value={ newVal ? newVal : (defaultVal ? defaultVal.id : undefined) } >
          <option>Select Campus:</option>
            {
            list && list.map(camp => <option key={camp.id} value={camp.id}>{camp.name}</option>)
            }
          </select>
          <input type="submit" name="submit" />
        </form>
      </div>
    )
  }
}
