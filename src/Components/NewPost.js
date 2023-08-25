import React from "react";
import { Link, Navigate  } from "react-router-dom";
import "../Styles/NewOrUpdatePost.css"
// import { error } from "console";
const containerStyle = {display: "flex", flexDirection: "column"}
const errorText = {color: "red", fontSize: "14px", marginTop: "5px"}

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {contentInput: "", titleInput: "", showErrorTitle: false, showErrorContent: false, isSubmittable: false}

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
        if (this.state.titleInput.trim() === '') {
            this.setState({ showErrorTitle: true });
        } else {
            this.setState({ showErrorTitle: false });
        }

        if (this.state.contentInput.trim() === '') {
            this.setState({ showErrorContent: true });
        } else {
            this.setState({ showErrorContent: false });
        }

        if (this.state.titleInput.trim() === '' || this.state.contentInput.trim() === '') {
            this.setState({isSubmittable: false})
            return;
        }

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
            // window.location.replace("/")
            // console.log("at redirect")
            // this.props.navigate("/")
            this.setState({isSubmittable: true})

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
                        {this.state.showErrorTitle && (
                            <p className="error-text">Title is necessary</p>
                        )}

                        <h2>Content</h2>
                        <textarea onChange={this.contentChange} value={this.state.contentInput} />
                        {this.state.showErrorContent && (
                            <p className="error-text">Content is necessary</p>
                        )}

                        
                        {/* <Link to={"/"}><button type="button" onClick={this.handleSubmit}>Submit</button></Link> */}
                        <button type="button" onClick={this.handleSubmit}>Submit</button>

                        {this.state.isSubmittable && (<Navigate to="/" />)}
                    </div>
                </form>
            </div>
        )
    }
}

export default NewPost