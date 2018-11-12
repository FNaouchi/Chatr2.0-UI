import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Welcome extends Component {
  render() {
    return (
      <header className="masthead d-flex">
        <div className="container text-center my-auto z-1">
          {!this.props.user ? (
            <h1 className="mb-1">WELCOME TO CHATR</h1>
          ) : (
            <h1 className="mb-1">Welcome {this.props.user.username}</h1>
          )}
          <h3 className="mb-5">
            {!this.props.user
              ? "You're gonna need to login to see the messages"
              : "Select a channel to start chatting"}
          </h3>
          {!this.props.user && (
            <Link to="/login" className="btn btn-primary btn-lg">
              Login
            </Link>
          )}
        </div>
        <div className="overlay z-0" />
      </header>
    );
  }
}

const mapStateToProps = state => ({
  user: state.rootAuth.user
});

export default connect(
  mapStateToProps,
  null
)(Welcome);
