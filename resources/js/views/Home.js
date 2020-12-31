import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Posts from '../components/Posts';
import Forums from '../components/Forums';


class Home extends Component {
    constructor(){
        super();
        this.state = {
            forums: [],
            lastIndex: 0
        };
    }

    componentDidMount(){
        axios.get('/api/forums')
        .then(response => {
            console.log(response);
            const temptForums = response.data.map(item => {
                item.forumsId = this.state.lastIndex;
        
                this.setState({lastIndex: this.state.lastIndex + 1});
                return item;
              })
        
              //never modify state directly
              this.setState({
                forums: temptForums
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
        return (
            <div className="container">
                <div>
                    <h1> Home </h1>
                    <Forums forums={this.state.forums}  />
                    <Posts />
                    
                </div>
            </div>
        )
    };
}

export default Home;