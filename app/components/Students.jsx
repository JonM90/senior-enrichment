import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Campuses extends Component {

  constructor() {
    super()
    this.state = { students: [] }

    this.whichFetch = this.whichFetch.bind(this);
    this.fetchStudents = this.fetchStudents.bind(this);
    this.fetchLocalStuds = this.fetchLocalStuds.bind(this);
    this.removeStudent = this.removeStudent.bind(this);
    this.handleRemoval = this.handleRemoval.bind(this);
  }

  fetchStudents() {
    console.log('fetching studs')
    axios.get('/api/students')
    .then(res => res.data)
    .then( students => this.setState({students}) )
  }

  fetchLocalStuds(campusId) {
    console.log('fetching local studs with id:', campusId);
    axios.get(`/api/campuses/${campusId}`)
    .then(res => res.data.students)
    .then( students => {
      this.setState({students})
      console.log('Updated State:', this.state)
    })
  }

  whichFetch() {
    let myProps = this.props.match ? this.props : this.props.passedProps;
    let lastPath = myProps.match.url;
    lastPath.includes('student') ? this.fetchStudents() : this.fetchLocalStuds(+myProps.match.params.campusId);
  }

  removeStudent(id) {
    console.log('Rmvng stud with id:', id);
    axios.delete(`/api/students/${id}`)
    .then(res => {
      console.log('removeStudent res', res)
      return res.data
    })
    .then( data => {
      console.log('removeStudent res.data', data)
      this.whichFetch()
    })
  }

  handleRemoval(e) {
    e.preventDefault()
    const id = +e.target.id
    this.removeStudent(id)
  }

  componentDidMount() { this.whichFetch() }

  render() {
    //stateProp of local as bool to determine which buttons to render stud w. => global = delete & remove || local = remove
    const students = this.state.students
    console.log('STUDENTS BEING RENDERED!')
    return (
      <div>
        <h2>Enrolled Students:</h2>
        <button><Link to={'/students/addStudent'}> <i title="Add Student" className="material-icons">person_add</i> </Link></button>
        {
          students.map(student => (<div key={student.id}> <Link to={`/students/${student.id}`}> {student.name} </Link> <Link to="#"><i id={student.id} onClick={this.handleRemoval} className="material-icons md-18" title="Remove Student">remove_circle</i></Link> </div>) )
        }
      </div>
    )
  }

}
