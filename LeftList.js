import React from 'react';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';


class Header1 extends React.Component {
  render() {
      return (
      <>
            <ul className="list-group lll">
                <li className="list-group-item"><b>Page Summary</b></li>
                <li className="list-group-item"><Link className=" cc" to={''}>Page Display</Link></li>
                <li className="list-group-item"><Link className="cc" to={'/adduser'}>Add Page</Link></li>
                <li className="list-group-item"><b>Category Summary</b></li>
                <li className="list-group-item"><Link className=" cc" to={'/homeCat'}>Category Display</Link></li>
                <li className="list-group-item"><Link className="cc" to={'/addCat'}>Add Category</Link></li>
                <li className="list-group-item"><b>Product Summary</b></li>
                <li className="list-group-item"><Link className=" cc" to={'/homepro'}>Product Display</Link></li>
                <li className="list-group-item"><Link className="cc" to={'/addpro'}>Add Product</Link></li>
                <li className="list-group-item"><Link className="cc" to={'/chpass'}>Change Password</Link></li>
                <li className="list-group-item">Module Summary</li>
                <li className="list-group-item">Login Information<br/>Username : admin<br/>Email : example@domain.com</li>
            </ul>
      
      </>
    );
  }
}     

export default Header1; 