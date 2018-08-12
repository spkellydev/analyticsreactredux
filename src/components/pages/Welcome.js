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

  pushRouter = () => {
    this.props.history.push("/analytics");
  };

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

      setTimeout(() => {
        axios.get("/token").then(async response => {
          let token = await response.data.token;
          localStorage.setItem("token", token.token);
          this.pushRouter();
        });
      }, 3000);
    });
  };

  render() {
    return <button onClick={this.onOauth}>{this.state.message}</button>;
  }
}

export default connect(null)(Welcome);
