    import React from 'react';
    import Swal from 'sweetalert2';
    import { Redirect } from 'react-router';
    import Header1 from './Header1';
    import LeftList from './LeftList';
    //bootstrap
    import 'bootstrap/dist/css/bootstrap.min.css';
    //axios for api request
    import axios from 'axios';
    class Add_Product extends React.Component {
      constructor(props)  
        {
          super(props);
            const token = localStorage.getItem("token");
            let loggedIn = true;  
            if(token === null){
                loggedIn = false
            }

          this.state={
            loggedIn,
            categoryid: '',
            pname: '',
            pprice: '',
            pcontent: '',
            pdisplayorder: '',
            pstatus: '',
            selectedFile: null
          }
          this.addFormData = this.addFormData.bind(this);
          this.onFileChange = this.onFileChange.bind(this);
        }
        onFileChange (event) { 
            this.setState({ selectedFile: event.target.files[0] });
        };

      //Form Submission
      addFormData(evt)
      {
        evt.preventDefault();
        let formData = new FormData();
        formData.append(
        'myFile',
        this.state.selectedFile,
      );
        formData.append('categoryid', this.state.categoryid)
        formData.append('pname', this.state.pname)
        formData.append('pprice', this.state.pprice)
        formData.append('pcontent', this.state.pcontent)
        formData.append('pdisplayorder', this.state.pdisplayorder)
        formData.append('pstatus', this.state.pstatus)
        axios.post('http://localhost/api1/crudproduct.php', formData).then(res=>
        {
                Swal.fire({
                title: 'Reactjs',
                text: res.data.data,
                type: 'success',
                icon: 'success',
                });
                this.setState({
                    categoryid: '',
                    pname: '',
                    pprice: '',
                    pcontent: '',
                    pdisplayorder: '',
                    pstatus: '',
                    selectedFile: null
                });
                
            })

            .catch(function (res) {
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
                                                <th colspan="2" bgcolor="lightgrey">Add Product Data</th>
                                            </tr>
                                            <tr>
                                                <td align="right">Category ID</td><td><input type="text" className="form-control" id="categoryid" name="categoryid" value={this.state.categoryid} onChange={e => this.setState({ categoryid: e.target.value })}/></td>
                                            </tr>
                                            <tr>
                                                <td align="right">Product Name</td><td><input type="text" className="form-control" name="pname" value={this.state.pname} area-describedby="pnameHelp" onChange={e => this.setState({ pname: e.target.value })} /></td>
                                            </tr>
                                            <tr>
                                                <td align="right">Product Image</td><td><input type="file" onChange={this.onFileChange} /></td>
                                            </tr>
                                            <tr>
                                                <td align="right">Product Price</td><td><input type="text" className="form-control" name="pprice" value={this.state.pprice} area-describedby="ppriceHelp" onChange={e => this.setState({ pprice: e.target.value })} /></td>
                                            </tr>
                                            <tr>
                                                <td align="right">Product Content</td><td><textarea className="form-control" cols="50" rows="5" name="pcontent" value={this.state.pcontent} area-describedby="pcontentHelp" onChange={e => this.setState({ pcontent: e.target.value })}></textarea></td>
                                            </tr>
                                            <tr>
                                                <td align="right">Display Order</td><td><input type="text" className="form-control" name="pdisplayorder" value={this.state.pdisplayorder} area-describedby="pdisplayorderHelp" onChange={e => this.setState({ pdisplayorder: e.target.value })} /></td>
                                            </tr>
                                            <tr>
                                                <td align="right">Status</td><td><input type="text" className="form-control" name="pstatus" value={this.state.pstatus} area-describedby="pstatusHelp" onChange={e => this.setState({ pstatus: e.target.value })} /></td>
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
    export default Add_Product;