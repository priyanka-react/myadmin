import React from 'react';
//import './App.css';
import Swal from 'sweetalert2';
import Header1 from './Header1';
import LeftList from './LeftList';

//Import link to routing to other components
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/js/bootstrap.min.js';

//jquery for bootstrap modal

import $ from 'jquery'; // <-to import jquery
//import { FaUserPlus } from "react-icons/fa";

class Page_Display extends React.Component {
  constructor(props) {

    super();

        const token = localStorage.getItem("token");
        let loggedIn = true;
        if(token === null){
            loggedIn = false
        }
        this.state={
            loggedIn,
        
            name: '',
            content: '',
            displayorder: '',
            status: '',
            search:'',
            id:'',
            parentpage:'',
            data: [],
            userdetails:[],
       
      }
      this.addFormData = this.addFormData.bind(this);
      this.submitForm = this.submitForm.bind(this);
     
   }

    
    componentDidMount(){

        axios.get('http://localhost/api1/crudpage.php').then(res => 
        {
            
            this.setState({data: res.data});
        }); 
        
    }

        deletepage(pageid)
        {
          const fd = new FormData();
            fd.append('deleteid', pageid);
            
            
            axios.post('http://localhost/api1/crudpage.php', fd
            ).then(res=>
            {
      
              
              //Get all users details in bootstrap table
              axios.get('http://localhost/api1/crudpage.php').then(res => 
              {
              //Storing users detail in state array object
              this.setState({data: res.data});
              }); 
              //Success Message in Sweetalert modal
              Swal.fire({
                title: 'Page id '+pageid+' has been deleted.',
                text: res.data.data,
                type: 'success',
                icon: 'success',
                
              });
            
            }
            );
        }
        editpage(pageid){
          const fd = new FormData();
          fd.append('pageid', pageid);
          axios.post('http://localhost/api1/crudpage.php', fd).then(res=>
          {
          //Storing user detail in state array object
          this.setState({userdetails: res.data[0]});
          this.setState({name: res.data[0].name});
          this.setState({content: res.data[0].content});
          this.setState({displayorder: res.data[0].displayorder});
          this.setState({status: res.data[0].status});
          this.setState({id: res.data[0].id});
          $("#editmodal").modal("show");
        }
        )
        }
        //Form Submission for updation
        addFormData(evt)
        {
          evt.preventDefault();
          const fd = new FormData();
          fd.append('updatename', this.state.name);
          fd.append('updatecontent', this.state.content);
          fd.append('updatedisplayorder', this.state.displayorder);
          fd.append('updatestatus', this.state.status);
          fd.append('updateid', this.state.id);
          axios.post('http://localhost/api1/crudpage.php', fd).then(res=>
          {
            this.myFormRef.reset();
            $("#editmodal").modal("hide");
            //Get all users details in bootstrap table
            axios.get('http://localhost/api1/crudpage.php').then(res =>
            {
            //Storing users detail in state array object
            this.setState({data: res.data});
            }); 
            //Success Message in Sweetalert modal
            Swal.fire({
              title: 'User id of '+this.refs.myID.value+' has been updated.',
              text: res.data.data,
              type: 'success',
            });
          }
          );
        }


        submitForm(evt)
        {
          evt.preventDefault();
          const fd = new FormData();
          fd.append('sd',this.state.search);
          
          axios.post('http://localhost/api1/crudpage.php', fd) 
          .then(res =>
            {         
              //console.log("result-",res);
              
               // suucess message in sweetalert modal
              if(res.data.data === "page not found"){
               alert("page not found")
              }
              else{
                this.setState({data: res.data});
              }

              
            });
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
                  <h2>Page Display</h2>
                  <hr/>
                  <p>This section displays the list of pages</p>
                  <p>
                  <Link className="cc" to={'/adduser'}>Click here to create New page</Link></p>
                  <form onSubmit={(evt)=> this.submitForm(evt)} >
                  <table className="table border">
                      <tr bgcolor="lightgrey">
                          <td><b>Search</b></td>
                          </tr>
                      <tr>
                      <td><b>Search By Page Name: </b><input type="text" id="search" defaultValue={this.state.userdetails.search}  ref="name" onChange={e => this.setState({ search: e.target.value })}/></td>
                      </tr>
                      <tr>
                          <td><b>Search By Parent Name: </b><select>
                                  <option>Select Option</option>
                          </select> <button type="submit" value="submit" className="btn btn-dark">Search</button></td>
                      </tr>
                  </table>
                  </form>
                  <p>Page 1 of 2, showing 10 records out of 13 total,starting on record 1, ending on 10</p>
                  <div className="col-md-12  p-0">
                      <table className="table table-hover table-bordered">
                <thead>
                  <tr bgcolor="lightgrey">
                    <th>ID</th>
                    <th>ParentPage</th>
                    <th>Name</th>
                    <th>Content</th>
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
                        <td>{result.sl}</td>
                        <td>{result.name}</td>
                        <td>{result.content}</td>
                        <td>{result.displayorder}</td>
                        <td>{result.status}</td>
                        <td>
                          <button onClick={e => {this.editpage(result.id)}}> <i class=" dd fas fa-edit"></i> </button>
                        </td>
                        <td>
                          <button onClick={e => {this.deletepage(result.id)}}> <i class=" dd fas fa-trash"></i> </button>
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
                  <h4 className="modal-title align-center">User : {this.state.userdetails.name}</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div className="modal-body text-center">
                <form ref={(el) => this.myFormRef = el}>
                <input type="hidden" id="name" value={this.state.userdetails.id} ref="myID" />
                  <div className="form-group">
                  <input type="text" className="form-control"  id="name" defaultValue={this.state.userdetails.name}
                    placeholder="Enter Name" ref="myname" 
                    onChange={e => this.setState({ name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <textarea className="form-control" cols="30" rows="5" id="content" defaultValue={this.state.userdetails.content}
                    placeholder="Enter Content" ref="myname" 
                    onChange={e => this.setState({ content: e.target.value })}></textarea>
                  </div>
                  <div className="form-group">
                  <input type="text" className="form-control"  id="displayorder" defaultValue={this.state.userdetails.displayorder}
                    placeholder="Enter Display order" ref="myname" 
                    onChange={e => this.setState({ displayorder: e.target.value })} />
                  </div>
                  <div className="form-group">
                  <input type="text" className="form-control"  id="status" defaultValue={this.state.userdetails.status}
                    placeholder="Enter status" ref="myname" 
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

export default Page_Display;