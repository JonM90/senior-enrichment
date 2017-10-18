import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
//import AddCampus from './AddCampus';
//import AddStudent from './AddStudent';
import axios from 'axios';

export default class Campuses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campuses: []
    }

    this.fetchCampuses = this.fetchCampuses.bind(this);
  }

  fetchCampuses() {
    axios.get('/api/campuses')
    .then(res => res.data)
    .then( campuses => this.setState({campuses}) )
  }

  componentDidMount() {
    this.fetchCampuses();
  }

  render() {
    const campuses = this.props.campus || this.state.campuses;

    return (
      <div>
      <button><Link to={'/campuses/addCampus'}>Add Campus</Link></button>
        { !Array.isArray(campuses) ? (<div key={campuses.id}> <h4>Attending Campus: <Link to={`/campuses/${campuses.id}`}> {campuses.name} </Link> </h4> </div>) :
          campuses.map(campus => <div key={campus.id}> <Link to={`/campuses/${campus.id}`}> {campus.name} </Link> </div>)
        }
      </div>
    )
  }

}

