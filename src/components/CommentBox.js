import React, { Component, Fragment } from "react";
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
      <Fragment>
        <form onSubmit={this.handleSumbit}>
          <h4>Add a comment</h4>
          <textarea onChange={this.handleChange} value={this.state.comment} />
          <div>
            <button>Sumbit comment</button>
          </div>
        </form>
        <button onClick={this.props.fetchComments}>Fetch comments</button>
      </Fragment>
    );
  }
}

export default connect(
  null,
  actions
)(CommentBox);
