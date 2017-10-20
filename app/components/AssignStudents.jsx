import React, { Component } from 'react';
import axios from 'axios';

export default class AssignStudents extends Component {
  constructor() {
    super()
    this.state = { campuses: [], students: [], transferStud: '', campTransfer: '', updated: {} }

    this.fetchStudents = this.fetchStudents.bind(this);
    this.fetchCampuses = this.fetchCampuses.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.editInfo = this.editStudent.bind(this);
  }

  fetchStudents() {
    console.log('In fetchStudents')
    axios.get('/api/students')
    .then(res => res.data )
    .then(students => {
      //console.log('data from promise:', students)
      this.setState( {students} )
      console.log('In fetchStudents, updated state:', this.state)
    })
  }

  fetchCampuses() {
    console.log('In fetchCampuses')
    axios.get('/api/campuses')
    .then(res => res.data )
    .then(campuses => {
      //console.log('data from promise:', campuses)
      this.setState( {campuses} )
      console.log('In fetchCampuses, updated state:', this.state)
    })
  }

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({ [name]: val })
  }

  handleSubmit(e) {
    this.handleEdit();
    //e.preventDefault();
  }

  handleEdit() {
    let studId = +this.state.transferStud;
    let studUp = this.state.students.filter(stud => stud.id === studId)
    let campId = +this.state.campTransfer;

    const updateStud = Object.assign({}, {name: studUp.name, email: studUp.email, image: studUp.image, campusId: campId})

    console.log( 'Sending obj to editStudent', updateStud, 'studId:', studId, 'typeof studId', typeof studId, 'campId:', campId, 'typeof campId', typeof campId)

    this.editStudent(updateStud, studId);
  }

  editStudent(toUpdate, editId) {
    console.log('incoming Info toUpdate:', toUpdate, 'editId', editId);

    axios.put(`/api/students/${editId}/edit`, toUpdate)
    .then(res => {
      console.log('Axios editStudent res:', res)
      return res.data
    })
    .then(student => {
      this.setState({ updated: student });
      console.log('Axios editStudent:', student)
      console.log('updated state:', this.state);
      //console.log('window.location', location);
      //location.replace( `/students/${id}` )
    })
  }

  componentDidMount() {
    this.fetchStudents();
    this.fetchCampuses();
  }

  componentWillReceiveProps(nextProps) {
    //Debating how to use this component
    console.log('In componentWillReceiveProps: nextProps:', nextProps);
  }

  render() {
    let campuses = this.state.campuses;
    const students = this.state.students;
    console.log('In AddStudent render, this.state:', this.state)

    return (
      <div >
        <form onSubmit={this.handleSubmit} onChange={this.handleChange} className="flex justify-evenly" style={{marginTop: '5rem'}}>

          <h2>Assign student: </h2>
          <select name="transferStud" >
          <option>Select Student:</option>
          {
            students && students.map(stud => <option key={stud.id} value={stud.id}>{stud.name}</option>)
          }
          </select>

          <h2> To campus: </h2>
          <select name="campTransfer" >
          <option>Select Campus:</option>
          {
            campuses && campuses.map(camp => <option key={camp.id} value={camp.id}>{camp.name}</option>)
          }
          </select>

          <input type="submit" name="submit" />
        </form>
      </div>
    )
  }
}
