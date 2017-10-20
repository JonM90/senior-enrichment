import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import AddCampus from './AddCampus';
//import AddStudent from './AddStudent';
import axios from 'axios';

export default class Campuses extends Component {
  constructor(props) {
    super(props)
    this.state = { campuses: [] }

    this.fetchCampuses = this.fetchCampuses.bind(this);
    this.removeCampus = this.removeCampus.bind(this);
    this.handleRemoval = this.handleRemoval.bind(this);
  }

  fetchCampuses() {
    axios.get('/api/campuses')
    .then(res => res.data)
    .then( campuses => this.setState({campuses}) )
  }

  removeCampus(id) {
    axios.delete(`/api/campuses/${id}`)
    .then(res => {
      console.log('In removeCampus axios.delete, res', res)
      return res.data;
    })
    .then(data => {
      this.fetchCampuses();
    })
  }

  handleRemoval(e) {
    const id = e.target.id
    this.removeCampus(id)
    e.preventDefault()
  }

  componentDidMount() {
    this.fetchCampuses();
  }

  render() {
    console.log('in campuses RENDER, this.props:', this.props)
    const myProps = this.props.match ? this.props : this.props.passedProps;
    const lastPath = myProps.match.url;
    const fromCampuses = lastPath.includes('campuses');

    const campuses = fromCampuses ? this.state.campuses : this.props.campus
    console.log('in Campuses RENDER, fromCampuses?', fromCampuses, 'campuses:', campuses)

    return (
      <div>
        {
          campuses && fromCampuses ?
          ( <div>
              <h2>Active Campuses:</h2>
              <button title="Add Campus">
              <Link id="add-Campus" to={'/campuses/addCampus'}>
                <i className="material-icons">add_location</i>
                <i className="material-icons">school</i>
              </Link>
              </button>
              <div>
                {campuses.map(campus => (<div key={campus.id}> <Link to={`/campuses/${campus.id}`}> {campus.name} </Link> <Link to="#"><i id={campus.id} onClick={this.handleRemoval} title="Remove Campus" className="material-icons md-18">remove_circle</i></Link> </div>))}
              </div>
            </div>) : campuses &&
          (<div>
            <h4>Attending Campus: <Link to={`/campuses/${campuses.id}`}> {campuses.name} </Link> </h4>
          </div>)
        }
        { //When a campus closes down or a student is expelled from campus
          !campuses ?
          <div>
            <h4>Attending Campus: No Campus Selected</h4>
          </div> : null
        }
      </div>
    )
  }

}
