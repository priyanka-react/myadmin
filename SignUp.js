
    import React from 'react';
    import Swal from 'sweetalert2';
    import { Redirect } from 'react-router';
    import {Link} from 'react-router-dom';

    import Header2 from './Header2';
    import LeftList from './LeftList';
    //bootstrap
    import 'bootstrap/dist/css/bootstrap.min.css';
    //axios for api request
    import axios from 'axios';
    class Add_Product extends React.Component {
      constructor(props)
        {
          super(props);
          this.state={
            name: '',
            email: '',
            password: '',
          }
          this.addFormData = this.addFormData.bind(this);
        }
      //Form Submission
      addFormData(evt)
      {
        evt.preventDefault();
        let formData = new FormData();
        formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('password', this.state.password)
        axios.post('http://localhost/api1/register1.php', formData).then(res=>
        {
                Swal.fire({
                title: 'Reactjs',
                text: res.data.data,
                type: 'success',
                icon: 'success',
                });
                this.myFormRef.reset();
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
                            <div className="col-md-3">
                                </div>
                                <div className="col-md-6 border border-dark p-0">
                                    <form ref={(el) => this.myFormRef = el } id="create-course-form"> 
                                        <table className="table">
                                            <tr>
                                                <th colspan="2" bgcolor="lightgrey">Sign Up</th>
                                            </tr>
                                            <tr>
                                                <td align="right">Name</td><td><input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })}/></td>
                                            </tr>
                                            <tr>
                                                <td align="right">Email</td><td><input type="email" className="form-control" name="email" value={this.state.email} area-describedby="emailHelp" onChange={e => this.setState({ email: e.target.value })} /></td>
                                            </tr>
                                            <tr>
                                                <td align="right">Password</td><td><input type="Password" className="form-control" name="password" value={this.state.password} area-describedby="passwordHelp" onChange={e => this.setState({ password: e.target.value })} /></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td colspan="2"><button className="btn form-btn" name="save" onClick={this.addFormData}>Save</button> <button type="submit" className="btn btn-primary form-btn"><Link className="cc text-light" to={'/'}>Login</Link></button>

                                                </td>
                                            </tr>
                                        </table>
                                    </form>
                                </div>
                            </div>
                    </div>
                 <div className="fixed-bottom">   
                <hr/>    
                <div className="container-fluid date1">
                </div>
                </div>    
                </>
                )
            };
        }
    export default Add_Product;