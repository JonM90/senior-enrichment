import React, { Component } from 'react';
import AddStudent from './AddStudent';
import axios from 'axios';

export default class EditStudent extends Component {
  constructor() {
    super()
    this.state = { student: {} }
    this.fetchStudInfo = this.fetchStudInfo.bind(this);
  }

  fetchStudInfo() {
    const editId = this.props.match.params.studentId
    axios.get(`/api/students/${editId}`)
    .then(res => res.data)
    .then( student => this.setState({ student }) )
  }

  componentDidMount() {
    this.fetchStudInfo()
  }

  render() {
    const student = this.state.student
    return (
      <div >
        <h2>Editing Student: {student.name}</h2>
        <AddStudent student={student} />
      </div>
    )
  }
}
