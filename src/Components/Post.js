import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import '../Styles/Posts.css'

// const postStyle = {padding: 20, border: "2px solid red", marginTop: 20}
const postStyle = {}

class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            postData: this.props.postData,
            isDeleteLoading: false
        }
        this.handleDelete = this.handleDelete.bind(this);   

    }
    handleDelete() {
        const deleteData = async () => {
            this.setState({...this.state, isDeleteLoading: true})
            const response = await fetch(
            "https://realtime-rebbit-backend.vercel.app/api/posts/" + this.state.postData._id,
            {
                method: "DELETE", 
                headers: {
                    "Content-Type": "application/json",
                }, 
            });
            this.props.handleDeletedPost(this.state.postData._id)
        };
        deleteData();
    }

    render() {
        const postAddress = "/posts/" + this.state.postData._id
        return (
            <div className="post">
                {this.props.onSeparatePage ? 
                    <p>id: {this.state.postData._id}</p> : 
                    <p className='postLink'>id: <Link to={postAddress}>{this.state.postData._id}</Link></p>}
                
                <h2><b>{this.state.postData.title}</b></h2>
                <p className="content">{this.state.postData.content}</p>
                <p>Comments count: {this.state.postData.comments.length}</p>
                
                {this.props.onSeparatePage ? 
                    <div /> : 
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <Link to={postAddress + "/edit"}><button>Edit</button></Link>
                        <button onClick={this.handleDelete}>{
                            this.state.isDeleteLoading ? 'loading...' : "Delete"}</button>
                    </div>
                }
                
                
                
            </div>
            
        )
    }
}

export default Post