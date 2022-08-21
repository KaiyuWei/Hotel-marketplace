import {BrowserRouter, Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
// components
import Home from './booking/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import React from 'react';
import TopNav from './components/TopNav';
import Dashboard from './user/Dashboard';
import DashboardSeller from './user/DashboardSeller';
import NewHotel from './hotels/NewHotel';
import StripeCallback from './stripe/StripeCallback';
import EditHotel from './hotels/EditHotel';
import ViewHotel from './hotels/ViewHotel';
import StripeCancel from './stripe/StripeCancel';
import StripeSuccess from './stripe/StripeSuccess';

function App() {
  return (
    <BrowserRouter forceRefresh>
      <TopNav />
      <ToastContainer />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/dashboard/seller" component={DashboardSeller} />
        <PrivateRoute exact path="/hotels/new" component={NewHotel} />
        <PrivateRoute exact path="/hotel/edit/:hotelId" component={EditHotel} />
        <PrivateRoute exact path="/stripe/callback" component={StripeCallback} />
        <Route exact path="/hotel/:hotelId" component={ViewHotel} />
        <PrivateRoute exact path="/stripe/success/:hotelId" component={StripeSuccess} />
        <PrivateRoute exact path="/stripe/cancel" component={StripeCancel} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;