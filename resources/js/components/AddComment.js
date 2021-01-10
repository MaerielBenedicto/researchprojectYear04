import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class AddComment extends Component {
    constructor(){
        super();
        this.state = {
            comment: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleSubmitForm(e){
        //prevent from reloading page
        e.preventDefault();
        let token = localStorage.getItem("token");
        if(token){
            axios.post('/api/posts/' + this.props.postId + '/comments', 
            {
                body: this.state.comment,
                post_id: this.props.postId,
                user_id: this.props.user.id
            },
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then((response) => {
                console.log(response.data);
                
                let c = response.data.data;
                let b = { user: response.data.user };
                c = _.merge(response.data.data, b);
                this.setState({comment: ""});
                this.props.addComment(response.data.data);
                
              })
            .catch(function(error) {
                console.log(error);
                if(error){
                    console.log(error);
                } 
            });
        }
        else {
            this.props.history.push('/signin');
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
                <div className="add-comment-div">
                    <h4>Add comment</h4>
                        <form onSubmit={this.handleSubmitForm}>
                            <textarea className="comment-box form-control col-12 mb-3" rows="5" id="body" placeholder="Add a comment" name="comment"  
                            value={this.state.comment}
                            onChange={this.handleChange}>
                            </textarea>
                            <div className="col-12">
                                <button className="add-comment-bttn" type="submit">Add</button>
                            </div>
                        </form>
                </div>
            )        
    };
}

export default withRouter(AddComment);