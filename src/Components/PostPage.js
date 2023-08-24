import React from 'react';
import Post from "./Post"
import Comment from "./Comment"
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../Styles/PostPage.css"

class PostPage extends React.Component {
    constructor(props){
        super(props);
        const currentUrl = window.location.href;

        this.state = {_id: currentUrl.split('/').slice(-1), postData: null, userInput: "", comments: []}

        this.handleNewComment = this.handleNewComment.bind(this);
        this.handleChange = this.handleChange.bind(this);   
    }
    componentDidMount() {
        
        const fetchData = async () => {
            const response = await fetch(
            "https://realtime-rebbit-backend.vercel.app/api/posts/" + this.state._id
            );
            const json = await response.json();
            this.setState({
                postData: json.data
            });
            console.log("fantatheuwitww", json.data)
            this.setState({...this.state, comments: json.data.comments})

        };
        fetchData();
    }
    handleNewComment() {
        console.log(this.state.userInput)
        // const newComments = this.state.postData.comments
        const postComment = async () => {
            const response = await fetch(
            "https://realtime-rebbit-backend.vercel.app/api/posts/" + this.state._id + "/comments",
            {
                method: "POST", 
                body: JSON.stringify({text: this.state.userInput}),
                headers: {
                    "Content-Type": "application/json",
                }, 
            });

            const newComment = {text: this.state.userInput};
            const comments = [...this.state.comments, newComment]
            this.setState({...this.state, comments: comments})

        };
        postComment();

    }
    handleChange(e) {
        this.setState({
            userInput: e.target.value
        });
    }
    render() {
        if (!this.state.postData) return null
        return(
            <div className='PostPage'>
                <Post 
                    key={this.state._id} 
                    postData = {this.state.postData}
                    onSeparatePage = {true}
                />

                <div className="createComments">
                    <textarea onChange={this.handleChange} value={this.state.userInput} />
                    <button type='button' onClick={this.handleNewComment}>Submit</button>
                        

                </div>
                <div>
                    <h1>Comments</h1>
                    <ul>
                        {this.state.comments.map(comment => <li><Comment commentData = {comment} /></li>)}
                    </ul>
                </div>
            </div>
        )
    }

}

export default PostPage;