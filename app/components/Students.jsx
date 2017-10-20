import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Campuses extends Component {

  constructor() {
    super()
    this.state = { students: [], expelModeOn: false, localAccess: false, viewMode: false, form: ''}

    this.whichFetch = this.whichFetch.bind(this);
    this.fetchStudents = this.fetchStudents.bind(this);
    this.fetchLocalStuds = this.fetchLocalStuds.bind(this);
    this.handleSearchStuds = this.handleSearchStuds.bind(this)
    this.viewStuds = this.viewStuds.bind(this);
    this.expelMode = this.expelMode.bind(this);
    this.handleExpulsion = this.handleExpulsion.bind(this);
    this.removeStudent = this.removeStudent.bind(this);
  }

  componentDidMount() { this.whichFetch() }

  fetchStudents() {
    this.setState({localAccess: false});
    console.log('fetching studs')
    axios.get('/api/students')
    .then(res => res.data)
    .then( students => this.setState({students}) )
  }

  fetchLocalStuds(campusId) {
    this.setState({localAccess: true});
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

  handleSearchStuds(e){
    this.setState({ form: e.target.value.toLowerCase() });
  }

  viewStuds(e) {
    this.setState({viewMode: !this.state.viewMode})
    console.log('ViewingMode is', this.state.viewMode);
    e.preventDefault();
  }

  expelMode(e) {
    console.log('About to expel these fools');
    //renders expel buttons
    this.setState({expelModeOn: !this.state.expelModeOn, viewMode: true})

    let searchDiv = document.getElementById('search');
    console.log('searchDiv:', searchDiv)
    searchDiv.classList.toggle('hidden')
  }

  handleExpulsion(e) {
    //Is prevent needed since this isn't a submit?
    e.preventDefault()
    const id = +e.target.id
    this.removeStudent(id)
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

  render() {
    const students = this.state.students
    const matches = this.state.students.filter(student => {
      let lowers = student.name.toLowerCase()
      return lowers.match(this.state.form)
    });
    console.log('STUDENTS BEING RENDERED!', 'this.state.form:', this.state.form, 'matches:', matches)
    return (
      <div>
        <h2>Enrolled Students:</h2>

        <div className="flex">
          <Link to={'/students/addStudent'}>
            <button title="Add Student">
              <i className="material-icons">person_add</i>
            </button>
          </Link>
          <button title="Toggle Students" onClick={this.viewStuds}>
            <a href="#"><i className="material-icons">arrow_drop_down_circle</i></a>
          </button>
          { !this.state.localAccess ?
            <button title="Toggle Expulsion" onClick={this.expelMode}>
              <a href="#"><i className="material-icons">delete</i></a>
            </button> : null
          }
        </div>

        <div id="search">
          <div style={{marginTop: '20px'}}>
          <button title="Search Student">
            <i className="material-icons">search</i>
          </button>
          <input type="text" onChange={this.handleSearchStuds} placeholder="Enter student name" />
          </div>

          <h3>Students</h3>
          <div className="list-group">
          {
            matches.map(student => {
              return (
              <div className="list-group-item" key={student.id}>
                <Link to={`/students/${student.id}`}>{ student.name }</Link>
              </div>)
            })
          }
          </div>
        </div>

        { this.state.viewMode ?
          students.map(student => (<div key={student.id}>
            <Link to={`/students/${student.id}`}> {student.name} </Link>
            {this.state.expelModeOn ?
              <Link to="#">
                <i id={student.id} onClick={this.handleExpulsion} className="material-icons md-18" title="Remove Student">remove_circle</i>
              </Link> : null}
          </div>) ) : null
        }
      </div>
    )
  }

}
