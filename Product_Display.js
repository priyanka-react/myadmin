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
//import { FaUserPlus } from "react-icons/fa";

class Product_Dsiplay extends React.Component {
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
        categoryid: '',
        pname: '',
        productimage: '',
        pprice: '',
        pcontent: '',
        pdisplayorder: '',
        pstatus:'',
        data: [],
        userdetails:[],
       
      }
      this.addFormData = this.addFormData.bind(this);

     
   }

    
    componentDidMount(){

        axios.get('http://localhost/api1/crudproduct.php').then(res => 
        {
            
            this.setState({data: res.data});
        }); 
        
    }

        deleteproduct(productid)
        {
          const fd = new FormData();
            fd.append('deleteid', productid);
            
            
            axios.post('http://localhost/api1/crudproduct.php', fd
            ).then(res=>
            {
      
              
              //Get all users details in bootstrap table
              axios.get('http://localhost/api1/crudproduct.php').then(res => 
              {
              //Storing users detail in state array object
              this.setState({data: res.data});
              }); 
              //Success Message in Sweetalert modal
              Swal.fire({
                title: 'Product id '+productid+' has been deleted.',
                text: res.data.data,
                type: 'success',
                icon: 'success',
                
              });
            
            }
            );
        }
        edituser(productid){
          const fd = new FormData();
          fd.append('productid', productid);
          axios.post('http://localhost/api1/crudproduct.php', fd).then(res=>
          {
          //Storing user detail in state array object
          this.setState({userdetails: res.data[0]});
          this.setState({categoryid: res.data[0].categoryid});
          this.setState({pname: res.data[0].pname});
          this.setState({pprice: res.data[0].pprice});
          this.setState({pcontent: res.data[0].pcontent});
          this.setState({pdisplayorder: res.data[0].pdisplayorder});
          this.setState({pstatus: res.data[0].pstatus});
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
          fd.append('updatecategoryid', this.state.categoryid);
          fd.append('updatepname', this.state.pname);
          fd.append('updatepprice', this.state.pprice);
          fd.append('updatepcontent', this.state.pcontent);
          fd.append('updatepdisplayorder', this.state.pdisplayorder);
          fd.append('updatepstatus', this.state.pstatus);
          fd.append('updateid', this.state.id);
          axios.post('http://localhost/api1/crudproduct.php', fd).then(res=>
          {
            this.myFormRef.reset();
            $("#editmodal").modal("hide");
            //Get all users details in bootstrap table
            axios.get('http://localhost/api1/crudproduct.php').then(res =>
            {
            //Storing users detail in state array object
            this.setState({data: res.data});
            }); 
            //Success Message in Sweetalert modal
            Swal.fire({
              title: 'Product id '+this.refs.myID.value+' has been updated.',
              text: res.data.data,
              type: 'success',
              icon: 'success'
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
                <h2>Product Display</h2>
                <hr/>
                <div className="col-md-12">
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr bgcolor="lightgrey">
                        <th>ID</th>
                        <th>Category ID</th>
                        <th>Product name</th>
                        <th>Product Image</th>
                        <th>Product price</th>
                        <th>Product content</th>
                        <th>Product displayorder</th>
                        <th>Product status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
          
                      {this.state.data.map((result) =>  {
                        return (
                         
                             <tr>
                              <td>{result.id}</td>
                              <td>{result.categoryid}</td>
                              <td>{result.pname}</td>
                              <td><img width="50px"src={`http://localhost/api1/images1/${result.productimage}`} alt="no img" /></td>
                              <td>{result.pprice}</td>
                              <td>{result.pcontent}</td>
                              <td>{result.pdisplayorder}</td>
                              <td>{result.pstatus}</td>
                              <td>
                                <button  onClick={e => {this.edituser(result.id)}}> <i class="fas fa-edit"></i> </button>
                              </td>
                              <td>  
                                <button  onClick={e => {this.deleteproduct(result.id)}}> <i class="fas fa-trash"></i></button>
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

          <div class="modal" id="editmodal">
            <div class="modal-dialog">
              <div class="modal-content">
              
                <div class="modal-header">
                  <h4 class="modal-title align-center">User : {this.state.userdetails.categoryid}</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div class="modal-body text-center">
                <form ref={(el) => this.myFormRef = el}>
                <input type="hidden" id="categoryid" value={this.state.userdetails.id} ref="myID" />
                  <div className="form-group">
                  <input type="text" className="form-control"  id="categoryid" defaultValue={this.state.userdetails.categoryid}
                    placeholder="Enter Category ID" ref="mycategoryid" 
                    onChange={e => this.setState({ categoryid: e.target.value })} />
                  </div>
                  <div className="form-group">
                  <input type="text" className="form-control"  id="pname" defaultValue={this.state.userdetails.pname}
                    placeholder="Enter Product name" ref="mycategoryid" 
                    onChange={e => this.setState({ pname: e.target.value })} />
                  </div>
                  <div className="form-group">
                  <input type="text" className="form-control"  id="pprice" defaultValue={this.state.userdetails.pprice}
                    placeholder="Enter Product price" ref="mycategoryid" 
                    onChange={e => this.setState({ pprice: e.target.value })} />
                  </div>
                  <div className="form-group">
                  <textarea className="form-control" cols="30" rows="5" id="pcontent" defaultValue={this.state.userdetails.pcontent}
                    placeholder="Enter Product content" ref="mycategoryid" 
                    onChange={e => this.setState({ pcontent: e.target.value })}></textarea>
                  </div>
                  <div className="form-group">
                  <input type="text" className="form-control"  id="pdisplayorder" defaultValue={this.state.userdetails.pdisplayorder}
                    placeholder="Enter Product Display order" ref="mycategoryid" 
                    onChange={e => this.setState({ pdisplayorder: e.target.value })} />
                  </div>
                  <div className="form-group">
                  <input type="text" className="form-control"  id="pstatus" defaultValue={this.state.userdetails.pstatus}
                    placeholder="Enter Product status" ref="mycategoryid" 
                    onChange={e => this.setState({ pstatus: e.target.value })} />
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={this.addFormData}>Update</button>
                </form>     
                </div>
              
                <div class="modal-footer">
                  <button type="button" className="btn btn-primary" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
    
        </>      
      
    )
  };
}

export default Product_Dsiplay;