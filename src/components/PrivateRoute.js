import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class PrivateRoute extends Component {
  render() {
    const { component: Component, user, ...rest } = this.props;
    console.log(user);
    return (
      <Route
        {...rest}
        render={props =>
          user ? <Component {...props} /> : <Redirect to="/welcome" />
        }
      />
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.rootAuth.user
  };
};

export default connect(mapStateToProps)(PrivateRoute);
