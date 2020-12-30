import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Navbar from '../components/Navbar';
import Forums from '../components/Forums';
import Posts from '../components/Posts';
import Signin from '../components/Signin';
import Home from './Home';

import '../../css/app.css';

class App extends Component {

    constructor(){
        super();
        this.state = {
            user: {},
            isLoggedIn: '',
            errors:  ''
        }

        this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
        this.getUser = this.getUser.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);


    }

    //life cycle method
  componentDidMount(){
    this.checkIfLoggedIn();
  }


    checkIfLoggedIn(){
        let token = localStorage.getItem("token");
        console.log("Check if log in");
        if(token) {
        console.log("log in");
        this.setState({ isLoggedIn: true});          
        //get user data
          this.getUser();
        } else {
            console.log("not log in");
          this.setState({ isLoggedIn: false});
        }
      }

      login(){
        this.setState({
            isLoggedIn: true
        });
        console.log("is this working");
        this.getUser();
      }

      logout(){
        this.setState({
            isLoggedIn: false
        });      
    }

      getUser(){
        let token = localStorage.getItem("token");
        axios.get('/api/user',{
          headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
          console.log('USER DEETS',response);
          this.setState({
            user: response.data.user
          });
        })
        .catch(function(error){
            if(error){
                console.log(error);
                // this.errors = error.response.data.errors;
            } 
        });
        }

    render () {
        return (
            <div className="App">
                <Router>
                    <Navbar signout={this.logout}/>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/signin">
                            <Signin login={this.login} />
                        </Route>
                    </Switch>
            </Router>
            </div>
            
        )
    }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'))