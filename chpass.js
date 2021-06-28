 import React from 'react';
//import './App.css';
import Swal from 'sweetalert2';
//Import link to routing to other components
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header2 from './Header2';
import LeftList from './LeftList';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/js/bootstrap.min.js';
//jquery for bootstrap modal
import 'jquery/dist/jquery.min.js';
import $ from 'jquery'; // <-to import jquery
//import { FaUserPlus } from "react-icons/fa";

class Changepassword extends React.Component {
      constructor(props)
        {
          super(props);
          this.state={
            name:'',
            password: '',
            newpassword: '',
            cnewpassword: '',
          }
          this.onChange = this.onChange.bind(this);
          this.addFormData = this.addFormData.bind(this);
        }
        onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
      //Form Submission
      addFormData(evt)
      {
        
        evt.preventDefault();
        let formData = new FormData();
        formData.append('name', this.state.name)
        formData.append('pass', this.state.password)
        formData.append('npass', this.state.newpassword)
        formData.append('cnewpassword', this.state.cnewpassword)
    
        axios.post('http://localhost/api1/register4.php', formData
        ).then(res=>
        {
                Swal.fire({
                title: 'Change Password',
                text: res.data.data,
                type: 'success',
                icon: 'success',
                confirmButtonText:'Keep Me Logged in',
                showDenyButton: true,
                denyButtonText:'Logged out',
                denyButtonColor: "#7367f0",
                
                }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  window.location.href="/home";
                } else if (result.isDenied) {
                  window.location.href="/Logout";
                }
              });
                this.setState({
            name:'',
            password: '',
            newpassword: '',
            cnewpassword: '',
          });

                this.myFormRef.reset();
                document.getElementById("create-course-form").reset();
      
       }).catch(function (res) {
        console.log(res)
       });
       
       //this.props.history.push('');
    }
 
  render() {
    return (
      <>
        <Header2></Header2>
        <div className="container">
          <div className="row ">
            <div className="col-md-3"></div>
            <div className="col-md-6 border border-dark p-0">
              <form  ref={(el) => this.myFormRef = el} id="create-course-form"> 
                <table className="table">
                  <tr>
                    <th colspan="2" bgcolor="lightgrey">Change Password</th>
                  </tr>
                  <tr>
                    <td align="right">Enter Username</td><td><input type="text" className="form-control" id="Username"  name="name" value={this.state.name}   onChange={e => this.setState({ name: e.target.value })}/>
                    </td>
                  </tr>
                  <tr>
                    <td align="right">Old Password</td><td><input type="password" className="form-control" id="Username"  name="name" value={this.state.password}   onChange={e => this.setState({ password: e.target.value })}/>
                    </td>
                  </tr>
                  <tr>
                    <td align="right">New Password</td><td><input type="password" className="form-control" id="Username" name="name" value={this.state.newpassword} onChange={e => this.setState({ newpassword: e.target.value })}/>
                    </td>
                  </tr>
                  <tr>
                    <td align="right">Confirm New Password</td><td><input type="password" className="form-control" id="Username"  name="name" value={this.state.cnewpassword} onChange={e => this.setState({ cnewpassword: e.target.value })}/>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td colspan="2"><button className="btn form-btn" onClick={this.addFormData}>Save</button> 
                    </td>
                  </tr>
                </table>
              </form>
            </div>
          </div>
        </div>
        <div className="fixed-bottom">   
          <hr/>    
          <div className="container-fluid date1"></div>
        </div>
      </>      
      
    )
  };
}

export default Changepassword;