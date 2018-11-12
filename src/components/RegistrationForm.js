import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import * as actionCreators from "../store/actions/index";
import { connect } from "react-redux";
let logtype;
class RegistationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentWillUnmount() {
    this.props.resetForm();
  }
  handleReset() {
    this.props.resetForm();
    this.setState({ username: "", password: "" });
  }
  submitHandler(e) {
    e.preventDefault();
    if (logtype === "login") {
      this.props.login(this.state, this.props.history);
    } else {
      this.props.signup(this.state, this.props.history);
    }
  }
  render() {
    if (this.props.user) {
      return <Redirect to="/" />;
    }
    const type = this.props.match.url.substring(1);
    if (type === "login") {
      logtype = "login";
    }
    return (
      <div className="card col-6 mx-auto p-0 mt-5">
        <div className="card-body">
          <h5 className="card-title mb-4">
            {type === "login"
              ? "Login to send messages"
              : "Register an account"}
          </h5>
          <form onSubmit={this.submitHandler}>
            {this.props.errors.non_field_errors && (
              <div className="alert alert-danger" role="alert">
                {this.props.errors.non_field_errors}
              </div>
            )}

            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                name="username"
                required
                value={this.state.username}
                onChange={this.changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                required
                value={this.state.password}
                onChange={this.changeHandler}
              />
            </div>
            <input
              className="btn btn-primary"
              type="submit"
              value={type.replace(/^\w/, c => c.toUpperCase())}
            />
          </form>
        </div>
        <div className="card-footer">
          <Link
            to={type === "login" ? "/signup" : "/login"}
            className="btn btn-small btn-link"
            onClick={() => this.handleReset()}
          >
            {type === "login"
              ? "register an account"
              : "login with an existing account"}
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.rootAuth.user,
  errors: state.rootError
});
const mapDispatchToProps = dispatch => ({
  login: (userData, history) =>
    dispatch(actionCreators.login(userData, history)),
  signup: (userData, history) =>
    dispatch(actionCreators.signup(userData, history)),
  resetForm: () => dispatch(actionCreators.setErrors({}))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistationForm);
