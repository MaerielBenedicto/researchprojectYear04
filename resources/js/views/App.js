import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import Forum from '../components/Forum';
import Post from '../components/Post';
import Signin from '../components/Signin';
import Register from '../components/Register';
import CreateForum from '../components/Modal/CreateForum';
import CreatePost from '../components/CreatePost';

import PrivateRoute from '../components/PrivateRoute';

import Home from './Home';

import '../../css/app.css';
// import '../../css/style.css';


class App extends Component {

    constructor(){
        super();
        this.state = {
            user: null,
            isLoggedIn: false,
            // isLoaded: false
        }

        // this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
        this.getUser = this.getUser.bind(this);
        // this.login = this.login.bind(this);
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
          this.getUser();
          this.setState({ isLoggedIn: true});         
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
                this.state.errors = error.response.data.errors;
            } 
        });
        }

    
    render () {
        return (
            <div className="App">
                <Router>
                    <Navbar logout={this.logout} user={this.state.user}/>
                    <Switch>
                         <Route path="/forums/:id">
                            <Forum />
                          </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/signin">
                            <Signin user={this.getUser}/>
                        </Route>
                       <Route path="/register">
                            <Register user={this.getUser} />
                        </Route>
                        <Route path="/forums/:id">
                            <Forum />
                        </Route>
                          <Route path="/posts/:id">
                              <Post user={this.state.user}/>
                          </Route>
                        {/* <PrivateRoute exact path="/forums/:post/posts" loggedIn={this.state.isLoggedIn} component={CreatePost}/> */}

                        <PrivateRoute exact path="/forums" user={this.state.user} component={CreateForum}/>
                        <Route path="/forums/:post/posts">
                            <CreatePost user={this.state.user}/>
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