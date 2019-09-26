import React from 'react';
import './app.scss';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Route exact key="0" path="/" component={Login} />
      <Route exact key="1" path="/login" component={Login} />
      <Route exact key="2" path="/register" component={Register} />
    </Router>
  );
}

export default App;
