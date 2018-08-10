import React, { Component, Fragment } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CommentBox from "./CommentBox";
import Header from "./pageParts/Header";
import Welcome from "./pages/Welcome";
import { Analytics } from "./Google/Analytics";
import { NotFound } from "./NotFound";
import * as actions from "../actions";

class App extends Component {
  renderButton() {
    let msg;
    const { auth, changeAuth } = this.props;
    if (auth) {
      msg = "Sign Out";
    } else {
      msg = "Sign In";
    }

    return (
      <button type="button" onClick={() => changeAuth(!auth)}>
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
      <Fragment>
        <Header />
        <Switch>
          <Route path="/analytics" component={Analytics} />
          <Route path="/post" component={CommentBox} />
          <Route path="/" exact component={Welcome} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    );
  }
}

App.propTypes = {
  auth: PropTypes.bool.isRequired,
  changeAuth: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  actions
)(App);
