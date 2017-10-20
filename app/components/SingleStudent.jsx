import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Campuses from './Campuses';
import axios from 'axios';

export default class Student extends Component {

  constructor() {
    super()
    this.state = { student: {} }
  }

  componentDidMount() {
    const studentId = this.props.match.params.studentId;

    axios.get(`/api/students/${studentId}`)
    .then(res => res.data)
    .then(student => this.setState({student}))
  }

  render() {
    const student = this.state.student
    const propCopy = Object.assign({}, this.props)
    return (
      <div>
        <span> <Link to={`/students/${student.id}/edit`} title="Edit Student">
          <i className="material-icons">content_cut</i>
          <i className="material-icons">create</i>
        </Link> </span>
        <h2>Name: {student.name}</h2>
        <img src={student.image} />
        <h4>E-mail: {student.email} </h4>
        <Campuses campus={student.campus} passedProps={propCopy} />
      </div>
    )
  }

}
