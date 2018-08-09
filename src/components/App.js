import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import CommentBox from "components/CommentBox";
import CommentList from "components/CommentList";
import Analytics from 'components/Google/Analytics'
import * as actions from "actions";

class App extends Component {
  renderButton() {
    let msg;
    if (this.props.auth) {
      msg = "Sign Out";
    } else {
      msg = "Sign In";
    }

    return (
      <button onClick={() => this.props.changeAuth(!this.props.auth)}>
        {msg}
      </button>
    );
  }

  renderHeader() {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/post">Post</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>{this.renderButton()}</li>
      </ul>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        <Route path="/analytics" component={Analytics} />
        <Route path="/post" component={CommentBox} />
        <Route path="/" exact component={CommentList} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  actions
)(App);
