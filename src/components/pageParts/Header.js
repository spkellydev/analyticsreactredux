import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderLink() {
    if (this.props.authenticated) {
      return (
        <Fragment>
          <li className="nav-item">
            <Link to="/signout">Sign Out</Link>
          </li>
          <li className="nav-item">
            <Link to="/analytics">Analytics</Link>
          </li>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <li className="nav-item">
            <Link to="/signup">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link to="/signin">Sign In</Link>
          </li>
        </Fragment>
      );
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button type="button" className="navbar-toggler">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            {this.renderLink()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
