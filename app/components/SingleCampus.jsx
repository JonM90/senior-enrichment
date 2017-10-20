import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Students from './Students';
import axios from 'axios';

export default class SingleCampus extends Component {

  constructor() {
    super();
    this.state = { campus: {} }
    this.fetchLocalInfo = this.fetchLocalInfo.bind(this);
  }

  fetchLocalInfo(campusId) {
    axios.get(`/api/campuses/${campusId}`)
    .then(res => res.data)
    .then( campus => this.setState({campus}) )
  }

  componentDidMount() {
    this.fetchLocalInfo(this.props.match.params.campusId)
  }

  render() {
    const campus = this.state.campus;
    const propCopy = Object.assign({}, this.props)
    return (
      <div>
        <div className="flex"> <Link to={`/campuses/${campus.id}/edit`} title="Edit Campus">
          <i className="material-icons">settings</i>
          <i className="material-icons">build</i>
        </Link> <h2>{campus.name}</h2> </div>
        <img src={campus.image} />
        <Students passedProps={propCopy} />
      </div>
    )
  }

}
