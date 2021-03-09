import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import PostList from '../components/PostList';
import Post from '../components/Posts/Post';
import Signin from '../components/Signin';
import Register from '../components/Register';
import CreateForum from '../components/Modal/CreateForum';
import CreatePost from '../components/Posts/CreatePost';

//admin pages
import Dashboard from '../components/Dashboard/Dashboard';
import PrivateRoute from '../components/PrivateRoute';

import Forums from './Forums';
import Profile from './Profile';
import Home from './Home';

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
      forums: [],
      forums_bookmarks: [],
      posts_bookmarks: [],
      post_votes: [],
      comment_votes: []
    }

    // this.getUser = this.getUser.bind(this);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
    this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
    this.createForumSuccess = this.createForumSuccess.bind(this);
    this.onDeleteForum = this.onDeleteForum.bind(this);
    this.updateForumSuccess = this.updateForumSuccess.bind(this);
    this.AddForumbookmarkSuccess = this.AddForumbookmarkSuccess.bind(this);
    this.RemoveForumbookmarkSuccess = this.RemoveForumbookmarkSuccess.bind(this);
    this.AddPostbookmarkSuccess = this.AddPostbookmarkSuccess.bind(this);
    this.RemovePostbookmarkSuccess = this.RemovePostbookmarkSuccess.bind(this);
    this.uploadSuccess = this.uploadSuccess.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount() {
    let user = this.state.user;

    //get list of forums
    axios.get('/api/forums')
      .then((forums) => {
        const forumsData = forums.data;
        this.setState({
          forums: forumsData,
          isLoaded: true
        });
      })
      .catch(function (error) {
        console.log(error);
        if (error) {
          console.log(error);
        }
      });

    this.getPosts();

    if (user) {
      axios.get('/api/bookmarks',
        { headers: { Authorization: "Bearer " + user.token } })
        .then((response) => {
          const bookmarksData = response.data;

          this.setState({
            forums_bookmarks: bookmarksData.forums,
            posts_bookmarks: bookmarksData.posts,
            isLoaded: true
          });
        })
        .catch(function (error) {
          console.log(error);
          if (error) {
            console.log(error);
          }
        });
    }
  }

  onLoginSuccess(user, remember) {

    this.setState({
      user: user
    });

    if (remember) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    if (user.role === 'admin') {
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

  onSubmitSuccess(user) {
    this.setState({ user: user });
    localStorage.setItem("user", JSON.stringify(user));
    this.props.history.push('/');
  }

  createForumSuccess(forum) {
    console.log('foruum', forum);
    let tempForums = this.state.forums;

    //push comment in the beginning of the array 
    tempForums.push(forum);
    this.setState({
      forums: tempForums
    });
  }

  onDeleteForum(forum) {
    let tempForums = this.state.forums;
    //remove comment from array that matches the id
    tempForums.splice(tempForums.findIndex(f => f.id == forum.id), 1);
    this.setState({
      forums: tempForums
    });
  }

  updateForumSuccess(forum) {
    let tempForums = this.state.forums;
    //get rid of old comment
    tempForums.splice(tempForums.findIndex(f => f.id == forum.id), 1);
    //add updated comment
    tempForums.push(forum);
    this.setState({
      forums: tempForums
    });
  }

  //add forum to bookmark
  AddForumbookmarkSuccess(forum) {
    let tempForumsBookmarks = this.state.forums_bookmarks;

    //push comment in the beginning of the array 
    tempForumsBookmarks.push(forum);
    this.setState({
      forums_bookmarks: tempForumsBookmarks
    });
  }

  RemoveForumbookmarkSuccess(forum) {
    let tempForumsBookmarks = this.state.forums_bookmarks;
    //remove forum from array that matches the id
    tempForumsBookmarks.splice(tempForumsBookmarks.findIndex(f => f.id == forum.id), 1);
    this.setState({
      forums_bookmarks: tempForumsBookmarks
    });
  }

  AddPostbookmarkSuccess(post) {
    let tempPostsBookmarks = this.state.posts_bookmarks;

    //push comment in the beginning of the array 
    tempPostsBookmarks.push(post);
    this.setState({
      posts_bookmarks: tempPostsBookmarks
    });
  }

  RemovePostbookmarkSuccess(post) {
    let tempPostsBookmarks = this.state.posts_bookmarks;
    //remove forum from array that matches the id
    tempPostsBookmarks.splice(tempPostsBookmarks.findIndex(p => p.id == post.id), 1);
    this.setState({
      posts_bookmarks: tempPostsBookmarks
    });
  }

  uploadSuccess(image) {
    let token = this.state.user.token;
    axios.get('/api/user',
      { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        this.setState({ user: response.data.user })
      })
      .catch(function (error) {
        console.log(error);
        if (error) {
          console.log(error);
        }
      });
  }

  updateProfile() {
    let token = this.state.user.token;
    axios.get('/api/user',
      { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        this.setState({ user: response.data.user })
      })
      .catch(function (error) {
        console.log(error);
        if (error) {
          console.log(error);
        }
      });
  }

  getPosts() {
    //get list of posts
    axios.get('/api/posts-lists')
      .then((posts) => {
        const postsData = posts.data.data;
        this.setState({
          posts: postsData,
          // isLoaded: true
        });
      })
      .catch(function (error) {
        console.log(error);
        if (error) {
          console.log(error);
        }
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
          <Route path="/forums-lists">
            <Forums
              user={user}
              forums={this.state.forums}
              posts={this.state.posts}
              onDeleteForum={this.onDeleteForum}
              bookmarks={this.state.forums_bookmarks}
              AddbookmarkSuccess={this.AddForumbookmarkSuccess}
              RemovebookmarkSuccess={this.RemoveForumbookmarkSuccess}
            />
          </Route>
          <Route exact path="/">
            <Home
              user={user}
              posts={this.state.posts}
              forums={this.state.forums}
              getPosts={this.getPosts}
              bookmarks={this.state.posts_bookmarks}
              AddbookmarkSuccess={this.AddPostbookmarkSuccess}
              RemovebookmarkSuccess={this.RemovePostbookmarkSuccess}
              search={this.state.search}
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
            <PostList user={user}
              forums={this.state.forums}
              bookmarks={this.state.posts_bookmarks}
              getPosts={this.getPosts}
              AddbookmarkSuccess={this.AddPostbookmarkSuccess}
              RemovebookmarkSuccess={this.RemovePostbookmarkSuccess}
              posts={this.state.posts}
            />
          </Route>
          <Route path="/my-profile">
            <Profile user={user}
              bookmarks={this.state.bookmarks}
              uploadSuccess={this.uploadSuccess}
              updateProfile={this.updateProfile}
            />
          </Route>
          <Route path="/posts/:id">
            <Post user={user}
              forums={this.state.forums}
              AddbookmarkSuccess={this.AddPostbookmarkSuccess}
              RemovebookmarkSuccess={this.RemovePostbookmarkSuccess}
            />
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
            getPosts={this.getPosts}
          />
          <Route path="/dashboard">
            <Dashboard user={user} onSuccess={this.onLogoutSuccess} uploadSuccess={this.uploadSuccess} />
          </Route>
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default withRouter(App);

// ReactDOM.render(<App />, document.getElementById('root'))