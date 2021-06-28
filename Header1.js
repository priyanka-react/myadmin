import React from 'react';
import logo from './image/logo.png';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


class Header1 extends React.Component {
  render() {
    	return (
			<>
		      <div className="container">
		        <div className="row">
		            <div className="col-md-6">    
		                <img src={logo} />
		            </div>
		            <div className="col-md-6 ">    
		                <button className="btn btn-light float-right"><Link className="text-dark cc float-right " to={'/logout'}>Logout</Link></button>
		            </div>    
		        </div>    
		    </div>
		      <div className="container-fluid date">
		          <div className="container">
		              <h2>Thursday, 20<sup>th</sup> May 2021</h2>
		          </div>
		      </div>
		    </>
		);
	}
}	    

export default Header1; 