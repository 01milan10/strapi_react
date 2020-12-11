import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Home from '../Home/Home';
import Edit from '../Home/Edit';

export default function NavigationBar() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Work Todo</Navbar.Brand>
      </Navbar>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/edit/:id" exact component={Edit} />
      </Switch>
    </Router>
  );
}
