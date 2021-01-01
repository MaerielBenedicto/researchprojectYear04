import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Navbar from '../components/Navbar';
import Forums from '../components/Forums';
import Posts from '../components/Posts';
import Signin from '../components/Signin';
import Register from '../components/Register';
import Home from './Home';

// import '../../../public/css/app.css';
import '../../css/app.css';

class App extends Component {

    constructor(){
        super();
        this.state = {
            user: {},
            isLoggedIn: false,
            errors:  '',
            displayOut: 'block',
            displayIn: 'block'
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
        this.setState({ isLoggedIn: true}, () => this.setState({displayIn: 'none', displayOut: 'block'}));          
        //get user data
          this.getUser();
        } else {
        console.log("not log in");
          this.setState({ isLoggedIn: false}, () => this.setState({displayIn: 'block', displayOut: 'none'}));  
        }
      }

      login(){
        this.setState({isLoggedIn: true}, () => this.setState({displayIn: 'none', displayOut: 'block'}));
        this.getUser();
      }

      logout(){
        this.setState({isLoggedIn: false}, () => this.setState({displayIn: 'block', displayOut: 'none'}));
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
                this.state.errors = error.response.data.errors;
            } 
        });
        }

    
    render () {
        return (
            <div className="App">
                <Router>
                    <Navbar signout={this.logout} displayIn={this.state.displayIn} displayOut={this.state.displayOut}/>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/signin">
                            <Signin login={this.login} />
                        </Route>
                       <Route path="/register">
                            <Register login={this.login}/>
                        </Route>
                    </Switch>
            </Router>
            </div>
            
        )
    }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'))