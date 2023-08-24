import React from "react";
import { Link } from "react-router-dom";
import "../Styles/NewOrUpdatePost.css"
const containerStyle = {display: "flex", flexDirection: "column"}
const containerElementStyle = {margin: "20px 0"}

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {contentInput: "", titleInput: ""}

        this.handleSubmit = this.handleSubmit.bind(this);
        this.contentChange = this.contentChange.bind(this); 
        this.titleChange = this.titleChange.bind(this)
    }

   
    titleChange(e) {
        this.setState({
            titleInput: e.target.value
        })
    }
    contentChange(e) {
        this.setState({
            contentInput: e.target.value
        });
    }
    handleSubmit() {
        // console.log(this.state.userInput)
        console.log(this.state.contentInput, this.state.titleInput)
        const fetchData = async () => {
            const response = await fetch(
            "https://realtime-rebbit-backend.vercel.app/api/posts",
            {
                method: "POST", 
                body: JSON.stringify({title: this.state.titleInput, content: this.state.contentInput}),
                headers: {
                    "Content-Type": "application/json",
                }, 
            });
            window.location.replace("/")
        };
        fetchData();
    }

    render() {
        return(
            <div className="NewOrUpdatePost">
                <h1>New Post</h1>
                <form>
                    <div style={containerStyle}>
                        <h2>Title</h2>
                        <textarea onChange={this.titleChange} value={this.state.titleInput} />

                        <h2>Content</h2>
                        <textarea onChange={this.contentChange} value={this.state.contentInput} />

                        <button type="button" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewPost