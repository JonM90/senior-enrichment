import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class EditCampus extends Component {
  constructor() {
    super()
    this.state = { campus: {}, localStuds: [] }

    this.fetchInfo = this.fetchInfo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemoval = this.handleRemoval.bind(this);
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
      this.setState({ campus, localStuds: campus.students })
    })

    console.log('fetched Info, this.state:', this.state)
  }

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({ [name]: val })
  }

  handleRemoval(e) {
    const id = +e.target.id
    let rmvStud = this.state.localStuds.filter(stud => stud.id === id)[0]
    console.log('rmvStud:', rmvStud)
    let updateStud = Object.assign({}, {name: rmvStud.name, email: rmvStud.email, image: rmvStud.image, campusId: null})
    this.updateInfo(updateStud, id)
    e.preventDefault()
  }

  handleSubmit(e) {
    const editId = this.props.match.params.campusId
    console.log('current state:', this.state)
    let name = this.state.name ? this.state.name : this.state.campus.name
    let image = this.state.image ? this.state.image : this.state.campus.image
    console.log('about to send obj to updateInfo', {name, image})
    this.updateInfo({name, image}, editId);
    e.preventDefault();
    this.props.history.push(`/campuses/${editId}`)
  }

  updateInfo(toUpdate, editId) {
    let type = toUpdate.email ? 'students' : 'campuses';
    console.log('incoming info to update:', toUpdate)

    axios.put(`/api/${type}/${editId}/edit`, toUpdate)
    .then(res => {
      console.log('updateInfo res:', res)
      return res.data
    })
    .then(updatedInfo => {
      console.log('updatedInfo:', updatedInfo)
      if (type === 'campuses') this.setState({ campus: updatedInfo });
      this.fetchInfo()
      console.log('Updated state:', this.state);
    })
  }

  componentDidMount() {
    this.fetchInfo()
  }

  render() {
    const campus = this.state.campus
    const studs = this.state.localStuds
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

        {studs.map(stud => (<div key={stud.id}> <Link to={`/students/${stud.id}`}> {stud.name} </Link>
          <Link to="#" title="Remove Student">
            <i id={stud.id} onClick={this.handleRemoval} className="material-icons md-18">clear</i>
          </Link>
        </div>))}

      </div>
    )
  }

}
