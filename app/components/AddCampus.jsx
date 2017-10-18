import React, { Component } from 'react';
import axios from 'axios';

export default class AddCampus extends Component {
  constructor(p) {
    super(p)
    this.state = {
      //newCampus: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.addCampus = this.addCampus.bind(this);
  }

  // componentDidMount() {
  //   axios.post('/api/campuses/addCampus')
  //   .then(res => {
  //     console.log('res:', res);
  //     return res.data;
  //   })
  //   .then( data => {
  //     console.log('data:', data);
  //     //return this.setState({data})
  //   })
  // }

  // componentWillUpdate() {

  //   console.log('newCampus obj:', this.state);
  // }

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;

    this.setState({
      [name]: val
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    //this.addCampus(this.state);
    console.log('hiiii about to add')
    //addCampus(newCamp) {
      axios.post('/api/campuses/addCampus', {name: this.state.name, image: this.state.image} )
      .then(res => {
        //does axios.post not return a PROMISE!???!
        console.log('in front end...res:', res);
        return res.data;
      })
      .then( camp => {
        console.log('in front end camp:', camp);
        this.setState({campId: camp.id})
        console.log('stateUPDATED', this.state);
        console.log('camp:', camp, 'typeof camp.id:', typeof camp.id)
        this.props.history.push(`/campuses/${camp.id}`)
      })
    //}
    //console.log('this.props:', this.props)
    //setTimeout(function() {}, 1)
    //console.log('campId:', this.state.campId)
    //this.props.history.push(`/campuses/${campId}`)
  }

  render() {
    const lastTry = this.state.campId
    console.log('last try:', lastTry)
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
