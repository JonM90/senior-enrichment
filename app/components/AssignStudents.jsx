import React, { Component } from 'react';
import axios from 'axios';

export default class AssignStudents extends Component {
  constructor() {
    super()
    this.state = { students: [], campuses: [], homeless: [], transferStud: '', campTransfer: '', updated: {}, whichRender: '' }

    this.fetchHomeless = this.fetchHomeless.bind(this);
    this.fetchStudents = this.fetchStudents.bind(this);
    this.fetchCampuses = this.fetchCampuses.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.whichRender = this.whichRender.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.editInfo = this.editStudent.bind(this);
  }

  fetchHomeless() {
    axios.get('/api/students')
    .then(res => res.data )
    .then(students => {
      const homeless = students.filter(stud => {
        return stud.campusId === null;
      })
      this.setState( {homeless} )
    })
  }

  fetchStudents() {
    axios.get('/api/students')
    .then(res => res.data )
    .then( students => this.setState( {students} ) )
  }

  fetchCampuses() {
    axios.get('/api/campuses')
    .then(res => res.data )
    .then(campuses => this.setState( {campuses} ))
  }

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({ [name]: val })
  }

  whichRender(e) {
    document.getElementById('form').classList.remove('hidden');
    if (e.target.id === 'assign') {
      this.setState({whichRender: 'assign'});
      this.fetchHomeless();
    } else {
      this.setState({whichRender: 'transfer'});
      this.fetchStudents();
    }
  }

  handleSubmit(e) {
    this.handleEdit();
    this.fetchHomeless();
    this.fetchStudents();
  }

  handleEdit() {
    let studId = this.state.whichRender === 'assign' ? +this.state.assignStud : +this.state.transferStud
    let campId = +this.state.campTransfer;
    let studUp = this.state.students.filter(stud => stud.id === studId)

    const updateStud = Object.assign({}, {name: studUp.name, email: studUp.email, image: studUp.image, campusId: campId})

    this.editStudent(updateStud, studId);
  }

  editStudent(toUpdate, editId) {
    axios.put(`/api/students/${editId}/edit`, toUpdate)
    .then(res => res.data)
    .then(student => {
      alert( (this.state.whichRender === 'assign') ? `Successfully assigned ${student.name}` : `Successfully transfered ${student.name}`)
      this.setState({ updated: student })
    })
  }

  componentDidMount() {
    this.fetchStudents();
    this.fetchHomeless();
    this.fetchCampuses();
  }

  render() {
    const students = this.state.students;
    const homeless = this.state.homeless;
    const campuses = this.state.campuses;
    return (
      <div >

        <div className="flex justify-evenly" style={{marginTop: '3rem'}}>
          <button id="assign" type="button" className="btn btn-success btn-lg" name="assign" onClick={this.whichRender}> Assign </button>
          <button id="transfer" type="button" className="btn btn-success btn-lg" name="transfer" onClick={this.whichRender}> Transfer </button>
        </div>

      <div id="form" className="hidden">
        <form onSubmit={this.handleSubmit} onChange={this.handleChange} className="flex justify-evenly" style={{marginTop: '5rem'}}>
        {
          this.state.whichRender === 'assign' ?
          <div>
            <h2>Assign student:</h2>
            <select name="assignStud" >
            <option>Select Student:</option>
            {
            homeless && homeless.map(stud => <option key={stud.id} value={stud.id}>{stud.name}</option>)
            }
            </select>
          </div> :
          <div>
            <h2>Transfer student:</h2>
            <select name="transferStud" >
            <option>Select Student:</option>
            {
              students && students.map(stud => <option key={stud.id} value={stud.id}>{stud.name}</option>)
            }
            </select>
          </div>
        }
        <div>
          <h2> To campus: </h2>
          <select name="campTransfer" >
          <option>Select Campus:</option>
          {
            campuses && campuses.map(camp => <option key={camp.id} value={camp.id}>{camp.name}</option>)
          }
          </select>
        </div>
          <input type="submit" name="submit" />
        </form>
      </div>

      </div>
    )
  }
}
