import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProject, deleteProject } from '../../actions';
import history from '../../history';
import Modal from '../Modal';
import requireAuth from '../requireAuth';

const ProjectDelete = props => {
  useEffect(() => {
    props.getProject(props.match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderActions = () => {
    if (!props.project) {
      return;
    }

    const { id } = props.project;

    return (
      <React.Fragment>
        <button
          onClick={() => props.deleteProject(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/projects/list" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  const renderContent = () => {
    if (!props.project) {
      return 'Are you sure you want to delete this project?';
    }

    return `Are you sure you want to delete the project ${props.project.name}`;
  };

  return (
    <Modal
      title="Delete project"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push('/projects/list')}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return { project: state.projects[ownProps.match.params.id] };
};

export default requireAuth(
  connect(mapStateToProps, { getProject, deleteProject })(ProjectDelete)
);
