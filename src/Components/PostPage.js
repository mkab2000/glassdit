import React from 'react';
import Post from "./Post"
import "../Styles/PostPage.css"

class PostPage extends React.Component {
    constructor(props){
        super(props);
        const currentUrl = window.location.href;

        this.state = {_id: currentUrl.split('/').slice(-1), postData: null, userInput: "", comments: [], showErrorComment: false}

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
            // console.log("fantatheuwitww", json.data)
            this.setState({...this.state, comments: json.data.comments})

            const websocket = this.props.websocket
        
            

        };
        fetchData();

        const websocket = this.props.websocket;

        websocket.onmessage = (event) => {
            this.handleWebSocketMessage(event)
        };

    }
    handleWebSocketMessage(event) {
        // console.log("PostPage websocket")    
        const newEvent = JSON.parse(event.data);
        // console.log("test")
        if(newEvent.action === 15) {
            const newMessage = JSON.parse(newEvent.messages[0].data)
            // console.log(newMessage)
            if(newMessage.action === "updatePost") {
                this.setState({postData: newMessage.data, comments: newMessage.data.comments})
            }
        }
    }
    handleNewComment() {
        // console.log(this.state.userInput)
        // const newComments = this.state.postData.comments
        if(this.state.userInput.trim() === '') {
            this.setState({showErrorComment: true})
            return
        }
        else {
            this.setState({showErrorComment: false})
        }

        const sendComment = async () => {
            const response = await fetch(
            "https://realtime-rebbit-backend.vercel.app/api/posts/" + this.state._id + "/comments",
            {
                method: "POST", 
                body: JSON.stringify({text: this.state.userInput}),
                headers: {
                    "Content-Type": "application/json",
                }, 
            });

        };
        sendComment();

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
                    {this.state.showErrorComment && (
                        <p className="error-text">Field is necessary</p>
                    )}
                    <button type='button' onClick={this.handleNewComment}>Submit</button>
                </div>

                <div>
                    <h1>Comments</h1>
                    <ul>
                        {this.state.comments.map(comment => <li key={comment._id}>{comment.text}</li>)}
                    </ul>
                </div>
            </div>
        )
    }

}

export default PostPage;