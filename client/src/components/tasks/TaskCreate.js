import React from 'react';
import { connect } from 'react-redux';
import { newTask } from '../../actions';
import TaskForm from './TaskForm';
import requireAuth from '../requireAuth';

const TaskCreate = props => {
  const onSubmit = formValues => {
    props.newTask(formValues, props.match.params.projectId);
  };

  return (
    <div>
      <h3>Create task</h3>
      <TaskForm onSubmit={onSubmit} />
    </div>
  );
};

export default requireAuth(connect(null, { newTask })(TaskCreate));
