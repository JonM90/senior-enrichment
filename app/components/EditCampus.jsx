import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
//import SingleCampus from './SingleCampus';
import axios from 'axios';


//export const EditCampus =
export default class EditCampus extends Component {
  constructor() {
    super()
    this.state = { campus: {} }

    this.fetchInfo = this.fetchInfo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  fetchInfo() {
    const editId = this.props.match.params.campusId

    axios.get(`/api/campuses/${editId}`)
    .then(res => {
      console.log('fetchInfo res:', res)
      return res.data
    })
    .then(campus => {
      console.log('campus:', campus)
      this.setState({ campus })
    })
  }

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;

    this.setState({ [name]: val })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('current state:', this.state)
    let name = this.state.name ? this.state.name : this.state.campus.name
    let image = this.state.image ? this.state.image : this.state.campus.image
    console.log('about to send obj to updateInfo', {name, image})
    this.updateInfo({name, image});
  }

  updateInfo(camp) {
    const editId = this.props.match.params.campusId
    console.log('incoming campInfo:', camp)

    axios.put(`/api/campuses/${editId}/edit`, camp)
    .then(res => {
      console.log('updateInfo res:', res)
      return res.data
    })
    .then(campus => {
      console.log('campus:', campus)
      this.setState({ campus });
      console.log('Updated state:', this.state);
      this.props.history.push(`/campuses/${editId}`)
    })

  }


  componentDidMount() {
    this.fetchInfo()
  }

  render() {
    // export more code to keep things dry!
    // console.log('this.props.match.params:', this.props.match.params.campusId);
    const campus = this.state.campus
    console.log('In render!', 'this.state:', this.state)
    return (
      <div >
        <h2>Editing Campus: {campus.name}</h2>
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          Name:
          <input type="text" name="name" placeholder={campus.name} />
          Image Link:
          <input type="text" name="image" placeholder={campus.image} />
          <button type="submit" name="Edit">Edit</button>
        </form>
      </div>
    )
  }

}
