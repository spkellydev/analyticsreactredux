import React from "react";
import axios from "axios";
import { connect } from "react-redux";

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      url: ""
    };
  }
  componentDidMount() {
    axios.get("/ga/cb").then(response => {
      this.setState({
        url: response.data
      });

      let w = window.open(
        response.data,
        "Please Sign In",
        'width="500px,height="500px"'
      );

      window.onmessage = function(e) {
        w.close();
        let url = e.data;
        console.log(url);
      };
    });
  }

  render() {
    return (
      <div>
        <h1>Welcome Page</h1>
      </div>
    );
  }
}

export default connect(null)(Welcome);
