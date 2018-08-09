import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "actions";

class CommentBox extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);
  }
  state = {
    comment: ""
  };

  handleChange(e) {
    this.setState({
      comment: e.target.value
    });
  }

  handleSumbit(e) {
    e.preventDefault();

    this.props.saveComment(this.state.comment);

    this.setState({
      comment: ""
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSumbit}>
        <h4>Add a comment</h4>
        <textarea onChange={this.handleChange} value={this.state.comment} />
        <div>
          <button>Sumbit comment</button>
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  actions
)(CommentBox);
