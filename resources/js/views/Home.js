import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Post from '../components/Post';
import Forum from '../components/Forum';

import '../../css/app.css';
// import '../../css/style.css';

import { Link } from 'react-router-dom';


class Home extends Component {
    constructor(){
        super();
        this.state = {
            forums: [],
            isLoaded: false
        };
    }

    componentDidMount(){
        axios.get('/api/forums')
        .then(response => {
            // console.log(response);
             const temptForums = response.data;
        
              //never modify state directly
              this.setState({
                forums: temptForums,
                isLoaded: true
              });
        })
        .catch(function(error){
            if(error){
                console.log(error);
                this.state.errors = error.response.data.errors;
            } 
        });
    }

    render(){
        if(this.state.isLoaded){
            return (
                <div className="body-content">  
                <div className="container">
                    <div className="row item-list mb-3">
                        <div className="forum-list col-9 media py-3">
                            <div className="col-12">
                                {this.state.forums.map(item => (
                                <div className="forum col-12"  key={item.id}>
                                    <div className="forum-title">
                                        <Link to={`/forums/${item.id}`} className="forum-title">
                                            {item.topic}
                                        </Link>
                                    </div>
                
                                    <div className="forum-desc">
                                        { item.description}
                                    </div>
                                </div>
                                   ))}                           
                            </div>
                          
                        </div>
                       
                        <div className="col-3 py-3">
                            {/* <div className="col-12"> */}
                            <Link to={'/forums'}>
                                <button className="forum-bttn">Create a new Forum topic</button>
                            </Link>
                            {/* </div> */}
                        </div>
                </div>
                </div>
                    
            </div>
            )
        } else{
            return null;
        }
    };
}

export default Home;