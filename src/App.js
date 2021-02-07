import React from 'react';
import './App.scss';
import Home from './components/home/Home';
import Navbar from './components/common/Navbar';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import SubjectDetail from 'components/subject/SubjectDetail';
import Dashboard from 'components/dashboard/Dashboard';
import { SubjectCreate, SubjectEdit } from 'components/subject/form';
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
          <Route exact path="/chamados/criar" component={SubjectCreate} />
          <Route exact path="/chamado/:id/" component={ViewSolicitation} />
          <Route exact path="/chamado/:id/editar" component={SubjectEdit} />

          <Home/>
        </Switch>
      </Router>
    </div>
  );
}