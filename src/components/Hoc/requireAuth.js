import React, { Component } from "react";
import { connect } from "react-redux";

/**
 * @name requireAuth
 * @description this HOC looks to see if there is a TRUE boolean auth value within the application state. If the auth value is false, the user should be redirected
 */

export default ChildComponent => {
  class ComposedComponent extends Component {
    // for users who go directly to page
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // for users who are already on page, but have logged out (ex: Sign out button)
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    // leverages react-router history to change page
    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push("/");
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth.authenticated
    };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
