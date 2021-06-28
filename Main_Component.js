    import React from 'react';
    import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
    import Page_Display from './components/Page_Display';
    import Add_Page from './components/Add_Page';
    import Add_Category from './components/Add_Category';
    import Cat_Display from './components/Cat_Display';
    import Add_Product from './components/Add_Product';
    import Product_Display from './components/Product_Display';
    import Login from './components/Login';
    import chpass from './components/chpass';    
    import Logout from './components/Logout';
    import SignUp from './components/SignUp'
    
class Crud_Main extends React.Component {
  render() {
    return (
      <Router>
        <div className="maincontainer">
          <Switch>
              <Route exact path='/chpass' component={chpass} />
              <Route exact path='/SignUp' component={SignUp} />
              <Route exact path='/addpro' component={Add_Product} />
              <Route exact path='/homepro' component={Product_Display} />
              <Route exact path='/addcat' component={Add_Category} />
              <Route exact path='/homecat' component={Cat_Display} />
              <Route exact path='/adduser' component={Add_Page} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/home' component={Page_Display} />
              <Route exact path='/Logout' component={Logout} />
              <Route exact path='' component={Login} />     
            </Switch>
        </div>
      </Router>
    )
  };
}
export default Crud_Main;