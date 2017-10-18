import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Students from './Students';
import axios from 'axios';

export default class Campus extends Component {

  constructor() {
    super();
    this.state = {
      campus: {}
    }

    this.fetchLocalInfo = this.fetchLocalInfo.bind(this);
  }

  componentDidMount() {
    this.fetchLocalInfo(this.props.match.params.campusId)
  }

  fetchLocalInfo(campusId) {
    axios.get(`/api/campuses/${campusId}`)
    .then(res => res.data)
    .then( campus => this.setState({campus}) )
  }

  render() {
    const campus = this.state.campus;

    return (
      <div>
        <h2>{campus.name}</h2>
        <img src={campus.image} />
        <Students students={campus.students} />
      </div>
    )
  }

}
