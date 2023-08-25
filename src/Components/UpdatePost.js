import React from "react"
import { Navigate } from "react-router-dom";
import "../Styles/NewOrUpdatePost.css"

class UpdatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {postData: "", contentInput: "", titleInput: "", showErrorTitle: false, showErrorContent: false, isSubmittable: false}

        this.handleSubmit = this.handleSubmit.bind(this);
        this.contentChange = this.contentChange.bind(this); 
        this.titleChange = this.titleChange.bind(this);

        // console.log(this.state._id)
        const currentUrl = window.location.href.split('/');
        this.id = currentUrl[currentUrl.length-2]
    }
    componentDidMount() {
        // this.state._id = id
        // console.log(id)
        const getData = async () => {
            const response = await fetch(
            "https://realtime-rebbit-backend.vercel.app/api/posts/" + this.id
            );
            const json = await response.json();
            this.setState({
                postData: json.data,
                contentInput: json.data.content,
                titleInput: json.data.title
            });
            // console.log("fantatheuwitww", json.data)
            // console.log("post data", this.state.postData)
        };
        getData();
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

        const putData = async () => {
            const response = await fetch(
            "https://realtime-rebbit-backend.vercel.app/api/posts/" + this.id,
            {
                method: "PUT", 
                body: JSON.stringify({_id: this.id, title: this.state.titleInput, content: this.state.contentInput}),
                headers: {
                    "Content-Type": "application/json",
                }, 
            });
            // window.location.replace("/")
            this.setState({isSubmittable: true})
        };
        putData();
    }

    render() {

        return(
            <div className="NewOrUpdatePost">
                <h1>Edit Post</h1>
                <form>
                    <div>
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

                        <button type="button" onClick={this.handleSubmit}>Submit</button>
                        
                        {this.state.isSubmittable && (<Navigate to="/" />)}

                    </div>
                    
                </form>
            </div>
        )
    }
    
}

export default UpdatePost