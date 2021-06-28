    import React from 'react';
    import Swal from 'sweetalert2';
    import {Link} from 'react-router-dom';
    import Header1 from './Header1';
    import LeftList from './LeftList';

    import { Redirect } from 'react-router';
    //bootstrap
    import 'bootstrap/dist/css/bootstrap.min.css';
    //axios for api request
    import axios from 'axios';
    class Add_Page extends React.Component {
      constructor(props)
        {

          super(props);
            const token = localStorage.getItem("token");
            let loggedIn = true;
            if(token == null){
                loggedIn = false
            }

          this.state={
            name: '',
            content: '',
            displayorder: '',
            status: '',
            value: 'page1',
            loggedIn,
          }
          this.handleChange = this.handleChange.bind(this);
          this.onValueChange = this.onValueChange.bind(this);
          this.addFormData = this.addFormData.bind(this);
        }

        //selectbox
            handleChange(event) {
            this.setState({value: event.target.value});
        }  
        //radio
        onValueChange(event) {
        this.setState({
          status: event.target.value
        });
      }


      //Form Submission
      addFormData(evt)
      {
        evt.preventDefault();
        let formData = new FormData();
        formData.append('name', this.state.name)
        formData.append('content', this.state.content)
        formData.append('displayorder', this.state.displayorder)
        formData.append('status', this.state.status)
        formData.append('sl', this.state.value)
        axios.post('http://localhost/api1/crudpage.php', formData).then(res=>
        {
                Swal.fire({
                title: 'Reactjs',
                text: res.data.data,
                type: 'success',
                icon: 'success',
                });
                //this.myFormRef.reset();
                this.setState({
                    name: '',
                    content: '',
                    displayorder: '',
                    status: '',
                    value: 'page1',
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
                                            <th colspan="2" bgcolor="lightgrey">Add Page</th>
                                        </tr>
                                        <tr>
                                        <td align="right">Parent page</td><td>
                                            <select className="form-control" value={this.state.value} onChange={this.handleChange}>
                                                <option value="page1">page1</option>
                                                <option value="page2">page2</option>
                                                <option value="page3">page3</option>
                                                <option value="page4">page4</option>
                                            </select></td>
                                        </tr>
                                        <tr>
                                            <td align="right">Name</td><td><input className="form-control" type="text" id="name" name="name" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} /></td>
                                        </tr>
                                        
                                        <tr>
                                        <td align="right">Content</td><td><textarea className="form-control" cols="60" rows="10" name="content" value={this.state.content} area-describedby="contentHelp" onChange={e => this.setState({ content: e.target.value })}></textarea></td>
                                        </tr>
                                        
                                        <tr>
                                            <td align="right">Display Order</td><td><input className="form-control" type="text" name="displayorder" value={this.state.displayorder} area-describedby="displayorderHelp" onChange={e => this.setState({ displayorder: e.target.value })}/></td>
                                        </tr>
                                        <tr>
                                            <td align="right">Status</td>
                                            <td>
                                            <tr>
                                            <td>
                                            <input
                                                  type="radio"
                                                  value="active"
                                                  checked={this.state.status === "active"}
                                                  onChange={this.onValueChange}
                                                /> active
                                                </td>
                                                </tr>

                                                <tr>
                                                <td>
                                                <input
                                                  type="radio"
                                                  value="inactive"
                                                  checked={this.state.status === "inactive"}
                                                  onChange={this.onValueChange}
                                                /> inactive
                                                </td>
                                                </tr>
                                                <tr>
                                                <td>
                                                <input
                                                  type="radio"
                                                  value="other"
                                                  checked={this.state.status === "other"}
                                                  onChange={this.onValueChange}
                                                /> other
                                                </td>
                                                </tr>
                                             </td>
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
    export default Add_Page;