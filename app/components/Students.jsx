import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddStudent from './AddStudent';
import axios from 'axios';

export default class Campuses extends Component {

  constructor(props) {
    super(props)
    this.state = {
      students: []
    }

    //this.fetchCampuses = this.fetchCampuses.bind(this);

  }

  componentDidMount() {
    axios.get('/api/students')
    .then(res => res.data)
    .then(students => {
      this.setState({students})
    })

  }

  // fetchCampuses() {
  //   return axios.get('/api/campuses')
  //   .then(res => {
  //     console.log('axios response:', res)
  //     return res.data
  //   })
  //   .then(campusChoice => {
  //     console.log('promise resolved:', campusChoice)
  //     this.setState({campusChoice})
  //     return campusChoice
  //   })
  // }

  render() {
    const students = this.props.students || this.state.students
    //console.log('props:', this.props, 'state:', this.state)
    //const camps = this.fetchCampuses()
    return (
      <div>
        <h3>Enrolled Students:</h3>
        <button><Link to={'/students/addStudent'} >Add Student</Link></button>
        {
          students.map(student => <div key={student.id}> <Link to={`/students/${student.id}`}> {student.name} </Link> </div>)
        }
      </div>
    )
  }

}
