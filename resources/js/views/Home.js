import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Post from '../components/Posts/Post';
import Forum from '../components/Forum';
import Filter from '../components/Filter';

import '../../css/app.css';
// import '../../css/style.css';

import { Link } from 'react-router-dom';


class Home extends Component {
    constructor(){
        super();
        this.state = {
            forums: [],
            isLoaded: false,
            sortby: 'Latest'
        };

        this.forums = this.forums.bind(this);
        this.delete = this.delete.bind(this);
        this.changeSortby = this.changeSortby.bind(this);

    }

    componentDidMount(){
        this.forums();
    }

    forums(){
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

    delete(id) {
        console.log("DELETE");
        let token = localStorage.getItem("token");
        axios.delete('/api/forums/' + id,
        {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
            console.log(response);
            this.forums();
        })
        .catch(function(error){
            if(error){
                console.log(error);
                this.state.errors = error.response.data.errors;
            } 
        });
    }

    changeSortby(sort){
        this.setState({sortby: sort});
    }

    render(){
        if(this.state.isLoaded){
            return (
                <div>
                  <div className="col-12">
                      {/* <div> */}
                        <Filter sortby={this.state.sortby} changeSortby={this.changeSortby}/>      
                      {/* </div> */}
                    
                </div>      
                <div className="body-content forum-list-div">  
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

                                    {(this.props.user && this.props.user.id === item.user.id) ? ( 
                                    <Link to={{
                                        pathname: '/forums',
                                        state: {
                                            forumId: item.id,
                                            topic: item.topic,
                                            description: item.description,
                                            mode: 'edit'
                                        }}}>
                                      <div className="float-right bttn"> Edit </div>
                                    </Link>
                                    ) : ''}

                                    {(this.props.user && this.props.user.id === item.user.id) ? ( 
                                        <button className="bttn float-right" onClick={ () => this.delete(item.id)}>Delete</button>
                                    ) : ''}

                                    <div className="forum-desc">
                                        { item.description}
                                    </div>
                                    
                                </div>
                                   ))}                           
                            </div>
                          
                        </div>
                       
                        <div className="col-3 py-3">
                            {/* <div className="col-12"> */}
                            <Link to={{
                                pathname: '/forums',
                                state: {
                                    // forumId: this.props.match.params.forumId
                                }}} 
                            >
                                <button className="forum-bttn">Create a new Forum topic</button>
                            </Link>
                            {/* </div> */}
                        </div>
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