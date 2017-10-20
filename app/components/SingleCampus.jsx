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
    console.log('fetching local info with id:', campusId);
    axios.get(`/api/campuses/${campusId}`)
    .then(res => {
      console.log('in fetchLocalInfo axios.get.then, res:', res)
      return res.data
    })
    .then( campus => this.setState({campus}) )
  }

  componentDidMount() {
    console.log('SingleCamp component access, this.props', this.props)
    this.fetchLocalInfo(this.props.match.params.campusId)
  }

  render() {
    const campus = this.state.campus;
    const propCopy = Object.assign({}, this.props)
    console.log('SINGLECAMP BEING RENDERED!')
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
