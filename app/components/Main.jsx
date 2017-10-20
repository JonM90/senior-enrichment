import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
//import {Route} from 'react-router'
import Home from './Home';
import NavBar from './NavBar';
import Campuses from './Campuses';
import SingleCampus from './SingleCampus';
import AddCampus from './AddCampus';
import EditCampus from './EditCampus';
import Students from './Students';
import SingleStudent from './SingleStudent';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
//import axios from 'axios';


export default class Main extends Component {
  constructor() {
    super()
  }

  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <div id="main">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/campuses" component={Campuses} />
            <Route path="/campuses/addCampus" component={AddCampus} />
            <Route path="/campuses/:campusId/edit" component={EditCampus} />
            <Route path="/campuses/:campusId" component={SingleCampus} />
            <Route exact path="/students" component={Students} />
            <Route path="/students/addStudent" component={AddStudent} />
            <Route path="/students/:studentId/edit" component={EditStudent} />
            <Route path="/students/:studentId" component={SingleStudent} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}