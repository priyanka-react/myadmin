import React from 'react';
import Swal from 'sweetalert2';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header1 from './Header1';
import LeftList from './LeftList';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import $ from 'jquery';

class Product_Dsiplay extends React.Component {
  constructor(props) {
    super(props)
       


      this.state = {
        id:'',
        categoryid: '',
        pname: '',
        pprice: '',
        pcontent: '',
        pdisplayorder: '',
        pstatus:'',
        data: [],
        userdetails:[],
        term: '',
       
      }
     this.addFormData = this.addFormData.bind(this);

     
   }

    
    componentDidMount(){

        axios.get('http://localhost/api1/searchform.php').then(res => 
        {
            
            this.setState({data: res.data});
        }); 
        
    }

      addFormData(evt)
        {
          evt.preventDefault();
          const fd = new FormData();
          fd.append('term', this.state.term);
          axios.post('http://localhost/api1/searchform.php', fd).then(res=>
          {
            
            //Get all users details in bootstrap table
            axios.get('http://localhost/api1/searchform.php').then(res =>
            {
            //Storing users detail in state array object
                this.setState({userdetails: res.data});
            }); 
            //Success Message in Sweetalert modal
            Swal.fire({
              title: 'Reactjs',
              text: res.data.data,
              type: 'success',
            });
          }
          );
        }    




  render() {
        
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
                <input className="form-control" type="text" id="name" name="term" value={this.state.term} onChange={e => this.setState({ term: e.target.value })} />
                <hr/>
                <div className="col-md-12">
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr bgcolor="lightgrey">
                        <th>ID</th>
                        <th>Category ID</th>
                        <th>Product name</th>
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
              <div>
              <table className="table table-hover table-bordered">
                    <thead>
                      <tr bgcolor="lightgrey">
                        <th>ID</th>
                        <th>Category ID</th>
                        <th>Product name</th>
                        <th>Product price</th>
                        <th>Product content</th>
                        <th>Product displayorder</th>
                        <th>Product status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
          
                      {this.state.userdetails.map((result) =>  {
                        return (
                         
                             <tr>
                              <td>{result.id}</td>
                              <td>{result.categoryid}</td>
                              <td>{result.pname}</td>
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
          <hr/>
      <div className="container-fluid date1">
          
      </div>

          


        </>      
      
    )
  };
}

export default Product_Dsiplay;