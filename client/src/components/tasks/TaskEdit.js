import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTask, updateTask } from '../../actions';
import TaskForm from './TaskForm';
import requireAuth from '../requireAuth';

const TaskEdit = props => {
  useEffect(() => {
    props.getTask(props.match.params.taskId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = formValues => {
    props.updateTask(props.match.params.taskId, {
      ...formValues,
      projectId: props.task.projectId
    });
  };

  return (
    <div>
      <h3>Create task</h3>
      <TaskForm
        initialValues={_.pick(props.task, 'description', 'completed')}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { task: state.tasks[ownProps.match.params.taskId] };
};

export default requireAuth(
  connect(mapStateToProps, { getTask, updateTask })(TaskEdit)
);
