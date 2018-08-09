import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import requireAuth from "./Hoc/requireAuth";
import * as actions from "../actions";

class CommentBox extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSumbit = this.handleSumbit.bind(this);

    this.state = {
      comment: ""
    };
  }

  handleChange(e) {
    this.setState({
      comment: e.target.value
    });
  }

  handleSumbit(e) {
    e.preventDefault();

    const { comment } = this.state;
    const { saveComment } = this.props;

    saveComment(comment);

    this.setState({
      comment: ""
    });
  }

  render() {
    const { comment } = this.state;
    const { fetchComments } = this.props;
    return (
      <Fragment>
        <form onSubmit={this.handleSumbit}>
          <h4>Add a comment</h4>
          <textarea onChange={this.handleChange} value={comment} />
          <div>
            <button type="button">Sumbit comment</button>
          </div>
        </form>
        {/* eslint-disable */}
        <button
          type="button"
          className="fetch-comments"
          onClick={fetchComments}
        >
          Fetch comments
        </button>
        {/* eslint-enable */}
      </Fragment>
    );
  }
}

CommentBox.propTypes = {
  fetchComments: PropTypes.func.isRequired,
  saveComment: PropTypes.func.isRequired
};

export default connect(
  null,
  actions
)(requireAuth(CommentBox));
