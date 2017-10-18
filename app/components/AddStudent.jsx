import React, { Component } from 'react';
import axios from 'axios';

export default class AddStudent extends Component {
  constructor() {
    super()
    this.state = {
      //newStudent: {}
    }

    this.fetchCampuses = this.fetchCampuses.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addStudent = this.addStudent.bind(this);

  }

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const chosen = this.state.campusChoice.filter(camp => {
      if (camp.name === this.state.campusId) {
        console.log(typeof camp.id)
        return camp
      }
    })
    const chosenId = chosen[0].id
    // const newStudent = {
    //   name: e.target.name.value,
    //   email: e.target.email.value,
    //   image: e.target.image.value,
    //   campusId: e.target.campusId.value
    // }
    console.log('inner chosen:', chosen, 'chosenId', chosenId)
    this.setState({campusId: chosenId})
    console.log('this.state obj:', this.state)
    const newStud = Object.assign({}, {name: this.state.name, email: this.state.email, image: this.state.image, campusId: chosenId})
    console.log('newStud:', newStud)
    this.addStudent(newStud);
  }

  addStudent(newStud) {
    console.log('hiiii')
    axios.post('/api/students/addStudent', newStud)
    .then(res => {
      console.log('in front end...res:', res);
      return res.data;
    })
    .then( data => {
      console.log('in front end data:', data);
      //return this.setState({data})
    })
  }

  fetchCampuses() {
    return axios.get('/api/campuses')
    .then(res => {
      console.log('axios response:', res)
      return res.data
    })
    .then(campusChoice => {
      console.log('promise resolved:', campusChoice)
      this.setState({campusChoice})
      return campusChoice
    })
  }

  componentDidMount() {
    this.fetchCampuses();
    //console.log('state:', this.state)
  }

  render() {
    let list = this.state.campusChoice
    // let p = this.props
    // console.log('props:', p)
    console.log('list:', list)
    return (
      <div >
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          Name:
          <input type="text" name="name" />
          Email:
          <input type="email" name="email" />
          Image Link:
          <input type="text" name="image" />
          Desired Campus
          <select name="campusId">
          <option>Select Campus:</option>
            {
            list && list.map(camp => <option key={camp.id}>{camp.name}</option>)
            }
          </select>
          <input type="submit" name="submit" />
        </form>
      </div>
    )
  }
}
