import React, {useEffect} from 'react'
import {Route ,Switch} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Spinner} from 'react-bootstrap'

import Home from './containers/Home'
import Signin from './containers/Signin'
import Signup from './containers/Signup'
import Products from './containers/Products'
import Orders from './containers/Orders'
import Category from './containers/Category'
import Page from './containers/NewPage'
import PrivateRoute from './components/HOC/PrivateRoute'
import {isUserLoggedIn, getInitialData} from './actions'
import './App.css';


function App() {

  const auth = useSelector(state=> state.auth)
  // const category = useSelector(state=> state.category)
  const dispatch = useDispatch()

  useEffect(() => {
    if(!auth.authenticate){
        dispatch(isUserLoggedIn())
    }
    if(auth.authenticate){
      dispatch(getInitialData())
    }
  }, [auth.authenticate, dispatch])

  if(auth.loading){
    return (
      <>
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
      </>
      )
  }
  return (
    <div className="App">

        <Switch>
          <PrivateRoute path='/' exact component={Home}/>
          <PrivateRoute path='/page' component={Page}/>
          <PrivateRoute path='/products' component={Products}/>
          <PrivateRoute path='/orders' component={Orders}/>
          <PrivateRoute path='/category' component={Category}/>

          <Route path='/signin' component={Signin}/>
          <Route path='/signup' component={Signup}/>
        </Switch>

    </div>
  );
}

export default App;

