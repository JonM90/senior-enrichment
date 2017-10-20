import React, { Component } from 'react';
import axios from 'axios';

export default class AddCampus extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addCampus = this.addCampus.bind(this);
  }

  addCampus(newCamp) {
    axios.post('/api/campuses/addCampus', newCamp)
    .then(res => res.data)
    .then( camp => {
      this.props.history.push(`/campuses/${camp.id}`)
    })
  }

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({ [name]: val })
  }

  handleSubmit(e) {
    this.addCampus(this.state);
    e.preventDefault();
  }

  render() {
    return (
      <div >
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          Name:
          <input type="text" name="name" />
          Image Link:
          <input type="text" name="image" />
          <input type="submit" name="submit" />
        </form>
      </div>
    )
  }
}
