import React from "react";
import axios from "axios";
import { connect } from "react-redux";

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      url: "",
      message: "Sign In With Google"
    };

    this.onOauth = this.onOauth.bind(this);
  }

  onOauth = () => {
    axios.get("/ga/cb").then(response => {
      this.setState({
        url: response.data
      });

      window.open(
        response.data,
        "Please Sign In",
        'width="500px,height="500px"'
      );

      this.setState({
        message: "Processing..."
      });
    });
  };

  render() {
    return <button onClick={this.onOauth}>{this.state.message}</button>;
  }
}

export default connect(null)(Welcome);
