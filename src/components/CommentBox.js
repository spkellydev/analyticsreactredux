import React, { Component } from "react";

export default class CommentBox extends Component {
  render() {
    return (
      <form>
        <h4>Add a comment</h4>
        <textarea />
        <div>
          <button>Sumbit comment</button>
        </div>
      </form>
    );
  }
}
