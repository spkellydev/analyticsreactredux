import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions";

class SignUp extends Component {
  onSubmit = formProps => {
    const { signUp, history } = this.props;
    signUp(formProps, () => {
      history.push("/analytics");
    });
  };

  render() {
    const { handleSubmit, errorMessage } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field
            autoComplete="none"
            name="email"
            type="text"
            component="input"
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
            autoComplete="none"
            name="password"
            type="password"
            component="input"
          />
        </fieldset>
        <span>{errorMessage}</span>
        <button>Submit</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  };
}

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signup" })
)(SignUp);
