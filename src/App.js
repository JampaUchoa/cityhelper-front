import React from 'react';
import './App.scss';
import Home from './components/home/Home';
import Navbar from './components/common/Navbar';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from 'components/dashboard/Dashboard';
import ViewSolicitation from 'components/dashboard/ViewSolicitation';

export default function App() {

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          {/* <Route exact path="/login" component={Login} />
          <Route exact path="/criar-conta" component={Register} />
          <Route exact path="/logout" component={UserLogout} /> */}

          <Route exact path="/" component={Home} />
          <Route exact path="/chamados" component={Dashboard} />
          <Route exact path="/chamado/:id/" component={ViewSolicitation} />

          <Home/>
        </Switch>
      </Router>
    </div>
  );
}