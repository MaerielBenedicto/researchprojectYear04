import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route } from 'react-router-dom'

class PrivateRoute extends Component {

    render(){
        console.log(this.props.loggedIn);
        if(this.props.loggedIn){
            return <this.props.component />
        } else{
            return <Redirect to={'/signin'} />
        }
        
    };


}

export default PrivateRoute;