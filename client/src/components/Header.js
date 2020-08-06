import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = props => {
  const renderLinks = () => {
    if (props.authenticated) {
      return (
        <div className="right menu">
          <Link to="/projects/list" className="item">
            Projects
          </Link>
          <Link to="/signout" className="item">
            Sign Out
          </Link>
        </div>
      );
    }
    return (
      <div className="right menu">
        <Link to="/signup" className="item">
          Sign Up
        </Link>
        <Link to="/signin" className="item">
          Sign In
        </Link>
      </div>
    );
  };

  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Home
      </Link>
      {renderLinks()}
    </div>
  );
};

const mapStateToProps = state => {
  return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps)(Header);
