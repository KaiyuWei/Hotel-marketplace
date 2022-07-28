import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './booking/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import React from 'react';
import TopNav from './components/TopNav';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <BrowserRouter forceRefresh>
      <TopNav />
      <ToastContainer />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;