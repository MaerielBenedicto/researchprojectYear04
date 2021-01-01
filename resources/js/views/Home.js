import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Posts from '../components/Posts';
import Forums from '../components/Forums';
// import '../../../public/css/app.css';
import '../../css/app.css';

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
            <div className="body-content">  
            <div className="container">
            <div className="row item-list mb-3">
                {this.state.forums.map(item => (
                <div className="pet-item col-8 media py-3" key={item.forumsId}>
                    <div className="pet-info media-body">
                    <div className="pet-head d-flex">
                        <span className="pet-name">
                        {item.topic}
                        </span>
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
    };
}

export default Home;