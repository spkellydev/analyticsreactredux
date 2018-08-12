import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import CommentBox from "./CommentBox";
import Header from "./pageParts/Header";
import Welcome from "./pages/Welcome";
import Analytics from "./Google/Analytics";
import { NotFound } from "./pages/NotFound";
import * as actions from "../actions";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import SignOut from "./auth/SignOut";

const App = () => (
  <Fragment>
    <Header />
    <Switch>
      <Route path="/analytics" component={Analytics} />
      <Route path="/signout" component={SignOut} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/post" component={CommentBox} />
      <Route path="/" exact component={Welcome} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  actions
)(App);
