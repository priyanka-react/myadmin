    import React from 'react';
    import Swal from 'sweetalert2';
    import { Redirect } from 'react-router';
    import Header1 from './Header1';
    import LeftList from './LeftList';
    //bootstrap
    import 'bootstrap/dist/css/bootstrap.min.css';
    //axios for api request
    import axios from 'axios';
    class Add_Category extends React.Component {
      constructor(props)
        {
          super(props);
          const token = localStorage.getItem("token");
            let loggedIn = true;
            if(token === null){
                loggedIn = false
            }
          
          this.state={
            catname: '',
            displayorder: '',
            status: '',
            loggedIn,
          }
          
          this.addFormData = this.addFormData.bind(this);
        }
      //Form Submission
      addFormData(evt)
      {
        evt.preventDefault();
        let formData = new FormData();
        formData.append('catname', this.state.catname)
        formData.append('displayorder', this.state.displayorder)
        formData.append('status', this.state.status)
        axios.post('http://localhost/api1/crudcat.php', formData).then(res=>
        {
                Swal.fire({
                title: 'Reactjs',
                text: res.data.data,
                type: 'success',
                icon: 'success',
                });
                //this.myFormRef.reset();
                this.setState({
                catname: '',
                displayorder: '',
                status: '',
              });

            }).catch(function (res) {
            	console.log(res)
            });
            //this.props.history.push('');
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
                            
                            <div className="col-md-12 border border-dark p-0">
                                <form ref={(el) => this.myFormRef = el } id="create-course-form"> 
                                    <table className="table">
                                        <tr>
                                            <th colspan="2" bgcolor="lightgrey">Add Category</th>
                                        </tr>
                                        <tr>
                                            <td align="right">Category Name</td><td><input type="text" className="form-control" id="catname" name="catname" value={this.state.catname} onChange={e => this.setState({ catname: e.target.value })}/></td>
                                        </tr>
                                        <tr>
                                            <td align="right">Display Order</td><td><input type="text" className="form-control" name="displayorder" value={this.state.displayorder} area-describedby="displayorderHelp" onChange={e => this.setState({ displayorder: e.target.value })} /></td>
                                        </tr>
                                        <tr>
                                            <td align="right">Status</td><td><input type="text" className="form-control" name="status" value={this.state.status} area-describedby="statusHelp" onChange={e => this.setState({ status: e.target.value })} /></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td colspan="2"><button className="btn form-btn" onClick={this.addFormData}>Save</button> <button className="btn form-btn">Cancel</button></td>
                                        </tr>
                                    </table>
                                </form>
                            </div>
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
    export default Add_Category;