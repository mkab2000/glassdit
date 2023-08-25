import React from 'react';
import Nav from './Components/Nav';
import Post from './Components/Post'
import './Styles/Posts.css'

// const postListStyle = {margin: 20}
const postListStyle = {display: "flex", flexDirection: "column"}


class PostList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {data: []}

        this.websocket = this.props.websocket;  
    }
    componentDidMount() {
        this.fetchData();
        
        const websocket = this.props.websocket
        websocket.onmessage = (event) => {
            // console.log("PostList websocket")
            this.handleWebSocketMessage(event)
            
        };
    }
    handleWebSocketMessage = (event) => {
        const newEvent = JSON.parse(event.data);
        // console.log("test")
        if(newEvent.action === 15) {
            const newMessage = JSON.parse(newEvent.messages[0].data)
            // console.log(newMessage)
            switch(newMessage.action) {
                case "updatePost": {
                    // sends it twice
                    // console.log(newMessage.data.content)
                    this.setState((prevState) => ({
                        data: prevState.data.map(item => item._id === newMessage.data._id ? newMessage.data : item)
                    }));
                    break;
                }
                case "createPost": {
                    // console.log(JSON.stringify(newMessage.data))
                    this.setState((prevState) =>({
                        data: [newMessage.data, ...prevState.data]
                    }))
                    break;
                }
                case "deletePost": {
                    this.setState((prevState) => ({
                        data: prevState.data.filter(item => item._id !== newMessage.data._id)
                    }));
                    break;
                }
                default:
                    break;
            }
            // this.setState(...this.state, newData.messages.data)
        }
    }
    fetchData = async () => {
        const response = await fetch(
        "https://realtime-rebbit-backend.vercel.app/api/posts"
        );
        const json = await response.json();
        this.setState({data: json.data});
    };
    
    
    render() {
        // console.log(this.state.data)
        return (
            <div style={postListStyle}>
                <Nav />
                {this.state.data.map(data => 
                <Post 
                    postData = {data}
                    key = {data._id} 
                    />
                )}
                
            </div>
        );
    }
}

export default PostList