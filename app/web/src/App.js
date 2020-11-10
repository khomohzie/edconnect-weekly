import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import CreateProject from './CreateProject';
import Project from './Project';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={["/", "/home"]} exact={true} component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/projects/submit" component={CreateProject} />
        <Route path="/projects/:id" component={Project} />
        <Route path="*" render={() => <div className="text-center p-5"><h1>Oops! You're lost</h1></div>} />
      </Switch>
    </Router>
  );
}

export default App;
