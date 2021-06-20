import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { renewAccessToken } from '../actions';
import Header from './Header';
import Welcome from './Welcome';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Signout from './auth/Signout';
import ProjectList from './projects/ProjectList';
import ProjectCreate from './projects/ProjectCreate';
import ProjectEdit from './projects/ProjectEdit';
import ProjectDelete from './projects/ProjectDelete';
import TaskList from './tasks/TaskList';
import TaskCreate from './tasks/TaskCreate';
import TaskEdit from './tasks/TaskEdit';
import TaskDelete from './tasks/TaskDelete';

const App = (props) => {
  /* if (performance.navigation && performance.navigation.type === 1) {
    props.renewAccessToken();
  } */

  return (
    <div className="ui container">
      <Header />
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/projects/list" exact component={ProjectList} />
        <Route path="/projects/new" exact component={ProjectCreate} />
        <Route path="/projects/edit/:id" exact component={ProjectEdit} />
        <Route path="/projects/delete/:id" exact component={ProjectDelete} />
        <Route path="/projects/:projectId" exact component={TaskList} />
        <Route path="/tasks/new/:projectId" exact component={TaskCreate} />
        <Route path="/tasks/edit/:taskId" exact component={TaskEdit} />
        <Route path="/tasks/delete/:taskId" exact component={TaskDelete} />
      </Switch>
    </div>
  );
};

export default connect(null, { renewAccessToken })(App);
