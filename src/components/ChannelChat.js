import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/index";
class ChannelChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      username: this.props.user.username
    };
    this.onTextChange = this.onTextChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onTextChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.postMessage(this.props.match.params.channelId, this.state);
  }
  componentDidUpdate(prevprops) {
    if (this.props.match.params !== prevprops.match.params) {
      this.intervel = setInterval(
        () => this.props.fetchChannel(this.props.match.params.channelId),
        3000
      );
    }
  }
  componentDidMount() {
    this.intervel = setInterval(
      () => this.props.fetchChannel(this.props.match.params.channelId),
      3000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervel);
  }
  render() {
    if (!this.props.user) {
      return <Redirect to="/" />;
    }
    let channelChats = this.props.channelText.map(text => (
      <div>
        <h5 style={{ color: "red" }}> {text.username}: </h5>
        <p> {text.message} </p>
      </div>
    ));
    return (
      <div>
        <header className="masthead d-flex">
          <div className=" container mx-5 jumbotron">{channelChats}</div>
          <div className="overlay z-0" />
        </header>
        <form className="container" onSubmit={this.onSubmit}>
          <input
            style={{ width: 400 }}
            type="text"
            name="message"
            value={this.state.message}
            placeholder="Add a message..."
            onChange={this.onTextChange}
          />

          <input className="btn" type="submit" value="Add Message" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.rootAuth.user,
  channelText: state.rootChan.channelText
});
const mapDispatchToProps = dispatch => ({
  fetchChannel: channelId => dispatch(actionCreators.fetchChannel(channelId)),
  postMessage: (channelId, message) =>
    dispatch(actionCreators.postMessage(channelId, message))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelChat);
