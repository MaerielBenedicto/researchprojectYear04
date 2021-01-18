import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Forum from '../components/Forum';
import Post from '../components/Posts/Post';
import Signin from '../components/Signin';
import Register from '../components/Register';
import CreateForum from '../components/Modal/CreateForum';
import CreatePost from '../components/Posts/CreatePost';
//admin pages
import Dashboard from '../components/Dashboard/Dashboard';


import PrivateRoute from '../components/PrivateRoute';

import Home from './Home';
import Profile from './Profile';

import '../../css/app.css';


class App extends Component {

    constructor(){
        super();
        this.state = {
            user: null,
            isLoggedIn: false,

            // isLoaded: false
        }

        this.getUser = this.getUser.bind(this);
        this.logout = this.logout.bind(this);
    }

    //life cycle method
    componentDidMount(){
        // this.checkIfLoggedIn();
        let token = localStorage.getItem("token");
        console.log("Check if log in");
        if(token) {
          console.log("logged in");
          //get user data
          let userData = JSON.parse(localStorage.getItem('user'));
          this.setState({ user: userData, isLoggedIn: true});         
        } else {
        console.log("not log in");
          this.setState({ isLoggedIn: false});  
        }
    }

      logout(){
        let token = localStorage.getItem('token');
        axios.get('/api/logout',{
          headers: {
            'Authorization': "Bearer " + token,
            'Accept': 'application/json, text/plain'}
        })
        .then((response) => {      
          console.log("USER LOGGED OUT");
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.setState({
            user: null
          });
        })
        .catch(function(error){
          if(error){
            console.log(error);
          } 
        });
      }

      getUser(){
        let token = localStorage.getItem("token");
        axios.get('/api/user',{
          headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
          // console.log('USER DEETS',response);
          this.setState({
            user: response.data.user
          });
        })
        .catch(function(error){
            if(error){
                console.log(error);
                this.setState({errors: error.response.data.errors});
            } 
        });
        }

    
    render () {
      const user = JSON.parse(localStorage.getItem('user'));

        return (
            <div className="App">
                <Router>
                  {/* { user.role === 'user' && (    */}
                    <Navbar logout={this.logout} user={this.state.user}/>
                  {/* )} */}
                    <Switch>
                        <Route exact path="/">
                            <Home user={user}/>
                        </Route>
                        <Route path="/signin">
                            <Signin user={this.getUser}/>
                        </Route>
                       <Route path="/register">
                            <Register user={this.getUser} />
                        </Route>
                        <Route path="/forums/:forumId">
                            <Forum user={user}/>
                        </Route>
                        <Route path="/my-profile">
                            <Profile user={user}/>
                        </Route>
                          <Route path="/posts/:id">
                              <Post user={user}/>
                          </Route>
                        <PrivateRoute exact path="/forums" user={user} component={CreateForum}/>
                        <PrivateRoute path="/submit-post/:id" user={user} component={CreatePost}/>
                        <Route path="/dashboard">
                          <Dashboard user={user}/>
                        </Route>
                    </Switch>

                    <Footer />
                    
                </Router>
                
            </div>
        )
    }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'))