import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class SignOut extends Component {
  componentDidMount() {
    this.props.signOut();
  }
  render() {
    return (
      <div>
        <h1>Come back soon!</h1>
        <p>:)</p>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(SignOut);
