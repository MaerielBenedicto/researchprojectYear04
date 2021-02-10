import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route } from 'react-router-dom'

class PrivateRoute extends Component {

    render(){
        console.log(this.props.user);
        if(this.props.user){
            return <this.props.component render={(this.props)} user={this.props.user}/>
        } else{
            return <Redirect to={'/signin'} />
        }
    };

}

export default PrivateRoute;