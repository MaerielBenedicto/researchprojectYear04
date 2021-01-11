import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class CreateForum extends Component {
    constructor(props){
        super(props);
        this.state = {
            topic: props.location.state.topic || '',
            description: props.location.state.description || '',
            mode: props.location.state.mode || 'create'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleSubmitForm(e){
        //prevent from reloading page
        e.preventDefault();
        let token = localStorage.getItem("token");
        if(this.state.mode === 'create'){
            axios.post('/api/forums', 
            {
                topic: this.state.topic,
                description: this.state.description,
                user_id: this.props.user.id
            },
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then((response) => {
                // console.log(response.data.data);
                this.props.history.push('/forums/'+ response.data.data.id);   
              })
            .catch((error) => {
                console.log(error);
                if(error){
                    console.log(error);
                } 
            });   
        } else if(this.state.mode === 'edit') {
            axios.put('/api/forums/' + this.props.location.state.forumId, 
            {
                topic: this.state.topic,
                description: this.state.description,
                user_id: this.props.user.id
            },
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then((response) => {
                // console.log(response.data);
                this.props.history.push('/forums/'+ response.data.id); 
              })
            .catch((error) => {
                console.log(error);
                if(error){
                    console.log(error);
                } 
            }); 
        }
      }

    handleChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    render(){
        return (
            <div className="body-content">
                <div className="container">
                    {/* Create Forum */}
                    <form onSubmit={this.handleSubmitForm}> 
                    <div className="row">
                        <div className="col-lg-12">
                            <h3>Create new Forum Topic</h3>
                        </div>
                        <div className="col-lg-12 forum-topic">
                            <h4>Topic Title</h4>
                            <input id="forum-title" type="text" className="form-control-forum" placeholder="Title" name="topic" required 
                            value={this.state.topic}
                            onChange={this.handleChange} />
                        </div>
                        <div className="col-lg-12 forum-description">
                            <h3>Topic Description</h3>
                            <textarea className="form-control-forum-body col-12 mb-3" rows="9" id="description" placeholder="Description" name="description"  
                            value={this.state.description}
                            onChange={this.handleChange}>
                            </textarea>
                        </div>
                        <div className="form-bttn col-12">
                            <button className="submit-button" type="submit">Submit</button>
                        </div>
                    </div>
                    </form>
                    {/* END Create forum */}
                </div>
        </div>
        )
    };
}

export default withRouter(CreateForum);