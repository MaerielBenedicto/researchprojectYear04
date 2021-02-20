import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';


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

  constructor(props) {
    super(props);
    let localUser = null;
    const userString = localStorage.getItem('user');
    if (userString !== null) {
      localUser = JSON.parse(userString);
    }

    this.state = {
      user: localUser,
      forums: []
    }

    // this.getUser = this.getUser.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
    this.createForumSuccess = this.createForumSuccess.bind(this);
    this.onDeleteForum = this.onDeleteForum.bind(this);
    this.updateForumSuccess = this.updateForumSuccess.bind(this);
  }

  componentDidMount() {
    axios.get('/api/forums')
        .then(response => {
            // console.log(response);
             const forums = response.data;
        
              this.setState({
                forums: forums
              });
        })
        .catch(function(error){
            if(error){
                console.log(error);
                this.state.errors = error.response.data.errors;
            } 
        });
  }

  onLoginSuccess(user, remember) {

    this.setState({
      user: user
    });

    if (remember) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    if(user.role === 'admin'){
      this.props.history.push('/dashboard');            
    } else {
        console.log("user");
        this.props.history.push('/');          
    }
  }

  onLogoutSuccess() {
    this.setState({
      user: null
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.history.push('/');
  }

  onSubmitSuccess(user){
    this.setState({ user: user });
    localStorage.setItem("user", JSON.stringify(user));
    this.props.history.push('/');  
  }

  createForumSuccess(forum){
    console.log('foruum',forum);
    let tempForums = this.state.forums;

    //push comment in the beginning of the array 
    tempForums.push(forum);
    this.setState({
      forums: tempForums
    });
  }

  onDeleteForum(forum){
    let tempForums = this.state.forums;
    //remove comment from array that matches the id
    tempForums.splice(tempForums.findIndex(f => f.id == forum.id), 1);
    this.setState({
      forums: tempForums
    });
  }

  updateForumSuccess(forum){
    let tempForums = this.state.forums;
    //get rid of old comment
    tempForums.splice(tempForums.findIndex(f => f.id == forum.id), 1);
    //add updated comment
    tempForums.push(forum);
    this.setState({
      forums: tempForums
    });
  }


  render() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
      <div className="App">
          <Navbar 
            onSuccess={this.onLogoutSuccess} 
            user={this.state.user} 
          />
          <Switch>
            <Route exact path="/">
              <Home 
                user={user} 
                forums={this.state.forums}
                onDeleteForum={this.onDeleteForum}
              />
            </Route>
            <Route path="/signin">
              <Signin 
                onSuccess={this.onLoginSuccess}  
              />
            </Route>
            <Route path="/register">
              <Register 
                onSuccess={this.onSubmitSuccess}
              />
            </Route>
            <Route path="/forums/:forumId">
              <Forum user={user} forums={this.state.forums}/>
            </Route>
            <Route path="/my-profile">
              <Profile user={user} />
            </Route>
            <Route path="/posts/:id">
              <Post user={user} />
            </Route>
            <PrivateRoute exact path="/forums" 
                user={user} 
                component={CreateForum}
                createForumSuccess={this.createForumSuccess}
                updateForumSuccess={this.updateForumSuccess}
            />
            <PrivateRoute path="/submit-post/:id" 
                user={user} 
                component={CreatePost} 
            />
            <Route path="/dashboard">
              <Dashboard user={user} />
            </Route>
          </Switch>
          <Footer />
      </div>
    )
  }
}

export default withRouter(App);

// ReactDOM.render(<App />, document.getElementById('root'))