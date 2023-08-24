import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav';
import Post from './Components/Post'
import { Route, Routes, Link } from 'react-router-dom';
import './Styles/Posts.css'

// const postListStyle = {margin: 20}
const postListStyle = {display: "flex", flexDirection: "column"}


class PostList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {data: []}
        this.handleDeletedPost = this.handleDeletedPost.bind(this);
    }
    componentDidMount() {
        const fetchData = async () => {
            const response = await fetch(
            "https://realtime-rebbit-backend.vercel.app/api/posts"
            );
            const json = await response.json();
            this.setState({data: json.data});
        };
        fetchData();
        
    }
    handleDeletedPost(id) {
        this.setState({data: this.state.data.filter(post =>
            post._id !== id)})
    }
    render() {
        console.log(this.state.data)
        
        return (
            <div style={postListStyle}>
                <Nav />

                {this.state.data.map(data => 
                <Post 
                    postData = {data}
                    key = {data._id} 
                    handleDeletedPost = {this.handleDeletedPost}/>
                )}
                
            </div>
        );
    }
}

export default PostList