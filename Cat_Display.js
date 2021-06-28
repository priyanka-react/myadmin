import React from 'react';
//import './App.css';
import Swal from 'sweetalert2';
//Import link to routing to other components
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header1 from './Header1';
import LeftList from './LeftList';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/js/bootstrap.min.js';
//jquery for bootstrap modal
import 'jquery/dist/jquery.min.js';
import $ from 'jquery'; // <-to import jquery


class Cat_Display extends React.Component {
  constructor(props) {
    super(props)
      const token = localStorage.getItem("token");
        let loggedIn = true;
        if(token === null){
            loggedIn = false
        }


      this.state = {
        loggedIn,
        id:'',
        catname: '',
        displayorder: '',
        status: '',
        data: [],
        productdetails:[],
       
      }
      this.addFormData = this.addFormData.bind(this);

     
   }

    
    componentDidMount(){

        axios.get('http://localhost/api1/crudcat.php').then(res => 
        {
            
            this.setState({data: res.data});
        }); 
        
    }

        deletecategory(categoryid)
        {
          const fd = new FormData();
            fd.append('deleteid', categoryid);
            
            
            axios.post('http://localhost/api1/crudcat.php', fd
            ).then(res=>
            {
      
              
              //Get all users details in bootstrap table
              axios.get('http://localhost/api1/crudcat.php').then(res => 
              {
              //Storing users detail in state array object
              this.setState({data: res.data});
              }); 
              //Success Message in Sweetalert modal
              Swal.fire({
                title: 'Product '+categoryid+' has been deleted.',
                text: res.data.data,
                type: 'success',
                icon: 'success',
                
              });
            
            }
            );
        }
        editcategory(categoryid){
          const fd = new FormData();
          fd.append('categoryid', categoryid);
          axios.post('http://localhost/api1/crudcat.php', fd).then(res=>
          {
          //Storing user detail in state array object
          this.setState({id: res.data[0].id});
          this.setState({productdetails: res.data[0]});
          this.setState({catname: res.data[0].catname});
          this.setState({displayorder: res.data[0].displayorder});
          this.setState({status: res.data[0].status});
          $("#editmodal").modal("show");
        }
        )
        }
        //Form Submission for updation
        addFormData(evt)
        {
          evt.preventDefault();
          const fd = new FormData();
          fd.append('updatecatname', this.state.catname);
          fd.append('updatedisplayorder', this.state.displayorder);
          fd.append('updatestatus', this.state.status);
          fd.append('updateid', this.state.id);
          axios.post('http://localhost/api1/crudcat.php', fd).then(res=>
          {
            this.myFormRef.reset();
            $("#editmodal").modal("hide");
            //Get all users details in bootstrap table
            axios.get('http://localhost/api1/crudcat.php').then(res =>
            {
            //Storing users detail in state array object
            this.setState({data: res.data});
            }); 
            //Success Message in Sweetalert modal
            Swal.fire({
              title: 'Product id '+this.refs.myID.value+' has been updated.',
              text: res.data.data,
              type: 'success',
            });
          }
          );
        }
   
 
  render() {
      if(this.state.loggedIn === false){
            return <Redirect to="/" />
      }
      return (
        <>
          <Header1></Header1>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                  <LeftList></LeftList>
              </div>
              <div className="col-md-9">
                <h2>Category Display</h2>
                <hr/>
                <div className="col-md-12">
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr bgcolor="lightgrey">
                        <th>ID</th>
                        <th>Category name</th>
                        <th>Display order</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                    
                    {this.state.data.map((result) =>  {
                      return (
                       
                           <tr>
                            <td>{result.id}</td>
                            <td>{result.catname}</td>
                            <td>{result.displayorder}</td>
                            <td>{result.status}</td>
                            <td>
                              <button   onClick={e => {this.editcategory(result.id)}}> <i class="fas fa-edit"></i> </button>
                              </td>
                              <td>
                              <button  onClick={e => {this.deletecategory(result.id)}}> <i class="fas fa-trash"></i> </button>
                            </td>
                          </tr>
                       
                      )
                    })}
                     
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>  
          </div>
          <hr/>
      <div className="container-fluid date1">
          
      </div>

          <div className="modal" id="editmodal">
            <div className="modal-dialog">
              <div className="modal-content">
              
                <div className="modal-header">
                  <h4 className="modal-title align-center">User : {this.state.productdetails.catname}</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div className="modal-body text-center">
                <form ref={(el) => this.myFormRef = el}>
                <input type="hidden" id="catname" value={this.state.productdetails.id} ref="myID" />
                  <div className="form-group">
                  <input type="text" className="form-control"  id="catname" defaultValue={this.state.productdetails.catname}
                    placeholder="Enter catname" ref="mycatname" 
                    onChange={e => this.setState({ catname: e.target.value })} />
                  </div>
                  <div className="form-group">
                  <input type="text" className="form-control"  id="displayorder" defaultValue={this.state.productdetails.displayorder}
                    placeholder="Enter displayorder" ref="mycatname" 
                    onChange={e => this.setState({ displayorder: e.target.value })} />
                  </div>
                  <div className="form-group">
                  <input type="text" className="form-control"  id="status" defaultValue={this.state.productdetails.status}
                    placeholder="Enter status" ref="mycatname" 
                    onChange={e => this.setState({ status: e.target.value })} />
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={this.addFormData}>Update</button>
                </form>     
                </div>
              
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" className="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
    
        </>
      
    )
  };
}

export default Cat_Display;