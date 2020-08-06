import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../../actions';
import history from '../../history';
import Modal from '../Modal';
import requireAuth from '../requireAuth';

const Signout = props => {
  const renderActions = () => {
    return (
      <React.Fragment>
        <button onClick={() => props.signout()} className="ui button negative">
          Signout
        </button>
        <Link to="/projects/list" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  const renderContent = () => {
    return 'Are you sure you want to signout?';
  };

  return (
    <Modal
      title="Signout"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push('/projects/list')}
    />
  );
};

export default requireAuth(connect(null, { signout })(Signout));
