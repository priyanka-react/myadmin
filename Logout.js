import React from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class Logout extends React.Component {
    constructor(){
        super();
        localStorage.removeItem("token");
    }
    render() {
        return (
            
                <Redirect to="/" />
            
        )
    };
}
export default Logout;