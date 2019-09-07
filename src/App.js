import React from 'react';
import './app.scss';
import Login from './components/login/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Route path="/login/" component={Login} />
    </Router>
  );
}

export default App;
