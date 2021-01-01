import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Post from '../components/Post';
import Forum from '../components/Forum';
// import '../../../public/css/app.css';
import '../../css/app.css';

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
            console.log(response);
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
                    {this.state.forums.map(item => (
                    <div className="pet-item col-8 media py-3" key={item.id}>
                        <div className="pet-info media-body">
                        <div className="pet-head d-flex">
                            <Link to={`/forums/${item.id}`} className="forum-title">
                                {item.topic}
                            </Link>
                            {this.props.children}
                        </div>
    
                        <div className="apt-notes">
                        {item.description}
                        </div>
                        </div>
                    </div>
                    ))}
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