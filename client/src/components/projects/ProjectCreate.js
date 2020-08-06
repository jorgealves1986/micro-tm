import React from 'react';
import { connect } from 'react-redux';
import { newProject } from '../../actions';
import ProjectForm from './ProjectForm';
import requireAuth from '../requireAuth';

const ProjectCreate = props => {
  const onSubmit = formValues => {
    props.newProject(formValues);
  };

  return (
    <div>
      <h3>Create project</h3>
      <ProjectForm onSubmit={onSubmit} />
    </div>
  );
};

export default requireAuth(connect(null, { newProject })(ProjectCreate));
