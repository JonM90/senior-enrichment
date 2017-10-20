import React, { Component } from 'react';
import axios from 'axios';

export default class AddStudent extends Component {
  constructor(props) {
    super(props)
    //Diff btw this.props & props: ABSOLUTELY NOTHING
    this.state = { student: {}, campusChoice: []}

    this.fetchCampuses = this.fetchCampuses.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.editStudent = this.editStudent.bind(this);
  }

  fetchCampuses() {
    console.log('In fetch, this.props.student:', this.props.student)
    axios.get('/api/campuses')
    .then(res =>  res.data )
    .then(campusChoice => {
      //console.log('data from promise:', campusChoice)
      this.setState( {campusChoice} )
      //return campusChoice
      console.log('In fetchCampuses, updated state:', this.state)
    })
  }

  handleChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({ [name]: val })
  }

  handleSubmit(e) {
    let addOrEdit = this.props.match ? 'add' : 'edit';
    addOrEdit === 'add' ? this.handleAdd() : this.handleEdit();
    e.preventDefault();
  }

  handleAdd() {
    const newStud = Object.assign({}, {name: this.state.name, email: this.state.email, image: this.state.image, campusId: this.state.campusId})
    console.log('handling newStudAdd:', newStud)
    this.addStudent(newStud);
  }

  addStudent(newStud) {
    console.log('adding student')
    axios.post('/api/students/addStudent', newStud)
    .then(res => {
      //console.log('in addStudent, res:', res);
      return res.data;
    })
    .then( stud => {
      console.log('in addStudent, stud:', stud);
      this.props.history.push(`/students/${stud.id}`)
    })
  }

  handleEdit() {
    let studId = this.state.student.id;
    let name = this.state.name ? this.state.name : this.state.student.name
    let email = this.state.email ? this.state.email : this.state.student.email
    let image = this.state.image ? this.state.image : this.state.student.image
    let campusId = +(this.state.campusId ? this.state.campusId : this.state.student.campusId)
    console.log( 'Sending obj to editStudent', {name, email, image, campusId}, 'with campusId', campusId)
    this.editStudent({name, email, image, campusId}, studId);
  }

  editStudent(stud, id) {
    console.log('incoming studInfo:', stud, 'with id', id);

    axios.put(`/api/students/${id}/edit`, stud)
    .then(res => {
      console.log('Axios editStudent res:', res)
      return res.data
    })
    .then(student => {
      this.setState({ student });
      console.log('Axios editStudent:', student)
      console.log('updated state:', this.state);
      //console.log('window.location', location);
      location.replace( `/students/${id}` )
    })
  }

  componentDidMount() {
    this.fetchCampuses();
  }

  componentWillReceiveProps(nextProps) {
    console.log('In componentWillReceiveProps: nextProps.student:', nextProps.student);
    const student = nextProps.student;
    this.setState( {student} );
    let prevCamp = nextProps.student.campus
    this.setState({prevCamp})
    console.log('componentWillReceiveProps: Updated state:', this.state);
  }

  render() {
    console.log('this.props:', this.props)
    let list = this.state.campusChoice;
    const student = this.state.student;
    //For editStudent default option tag & rerendering on changes
    const defaultVal = this.state.prevCamp;
    let newVal = this.state.campusId
    console.log('In AddStudent render, this.state:', this.state)

    return (
      <div >
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          Name:
          <input type="text" name="name" placeholder={student.name} />
          Email:
          <input type="email" name="email" placeholder={student.email} />
          Image Link:
          <input type="text" name="image" placeholder={student.image} />
          Desired Campus
          <select name="campusId" value={ newVal ? newVal : (defaultVal ? defaultVal.id : undefined) } >
          <option>Select Campus:</option>
            {
            list && list.map(camp => <option key={camp.id} value={camp.id}>{camp.name}</option>)
            }
          </select>
          <input type="submit" name="submit" />
        </form>
      </div>
    )
  }
}
