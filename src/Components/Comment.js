import React from "react";

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {_id: "", text: "", updatedAt: "", createdAt: ""}
    }
    render() {
        // this.state._id = this.props.commentData._id;
        this.state.text = this.props.commentData.text;
        // this.state.updatedAt = this.props.commentData.updatedAt;
        // this.state.createdAt = this.props.commentData.createdAt;

        return (
            <div>{this.state.text}</div>
        )
    }
}

export default Comment