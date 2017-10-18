import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Campuses from './Campuses';
import axios from 'axios';

export default class Student extends Component {

  constructor() {
    super()
    this.state = {
      student: {}
    }
  }

  componentDidMount() {
    const studentId = this.props.match.params.studentId;

    axios.get(`/api/students/${studentId}`)
    .then(res => res.data)
    .then(student => this.setState({student}))
  }

  render() {
    const student = this.state.student

    return (
      <div>
        <h2>Name: {student.name}</h2>
        <img src={student.image} />
        <h4>E-mail: {student.email} </h4>
        <Campuses campus={student.campus} />
      </div>
    )
  }

}
