import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTask, deleteTask } from '../../actions';
import history from '../../history';
import Modal from '../Modal';
import requireAuth from '../requireAuth';

const TaskDelete = props => {
  useEffect(() => {
    props.getTask(props.match.params.taskId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderActions = () => {
    if (!props.task) {
      return;
    }

    const { id, projectId } = props.task;
    return (
      <React.Fragment>
        <button
          onClick={() => props.deleteTask(id, projectId)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to={`/projects/${props.task.projectId}`} className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  const renderContent = () => {
    if (!props.task) {
      return 'Are you sure you want to delete this task?';
    }

    return `Are you sure you want to delete the task with the description: ${props.task.description}`;
  };

  return (
    <Modal
      title="Delete task"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push(`/projects/${props.task.projectId}`)}
    />
  );
};

const mapStateToProps = (state, ownProps) => {
  return { task: state.tasks[ownProps.match.params.taskId] };
};

export default requireAuth(
  connect(mapStateToProps, { getTask, deleteTask })(TaskDelete)
);
