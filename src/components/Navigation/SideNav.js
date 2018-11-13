import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }
  componentDidMount() {
    this.props.fetchChannels();
  }
  render() {
    const channelLinks = this.props.channels.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));
    return (
      <div>
        <ul
          className="navbar-nav navbar-sidenav"
          style={{ overflowY: "scroll" }}
          id="exampleAccordion"
        >
          <li className="nav-item" data-toggle="tooltip" data-placement="right">
            {this.props.user ? (
              <Link className="nav-link heading" to="/createChannel">
                <span className="nav-link-text mr-2">Channels</span>
                <FontAwesomeIcon icon={faPlusCircle} />
              </Link>
            ) : (
              <h2 className="heading nav-link mr-2 mt-4">
                Signin to view channels
              </h2>
            )}
          </li>
          {this.props.user && <div>{channelLinks}</div>}
        </ul>

        <ul className="navbar-nav sidenav-toggler">
          <li className="nav-item">
            <span
              className="nav-link text-center"
              id="sidenavToggler"
              onClick={() =>
                this.setState(prevState => ({
                  collapsed: !prevState.collapsed
                }))
              }
            >
              <FontAwesomeIcon
                icon={this.state.collapsed ? faAngleRight : faAngleLeft}
              />
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.rootAuth.user,
  channels: state.rootChan.channels
});
const mapDispatchToProps = dispatch => ({
  fetchChannels: () => dispatch(actionCreators.fetchChannels())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SideNav)
);
