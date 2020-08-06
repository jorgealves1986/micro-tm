import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProject, updateProject } from '../../actions';
import ProjectForm from './ProjectForm';
import requireAuth from '../requireAuth';

const ProjectEdit = props => {
  useEffect(() => {
    props.getProject(props.match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = formValues => {
    props.updateProject(props.match.params.id, formValues);
  };

  return (
    <div>
      <h3>New project</h3>
      <ProjectForm
        initialValues={_.pick(props.project, 'name')}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { project: state.projects[ownProps.match.params.id] };
};

export default requireAuth(
  connect(mapStateToProps, { getProject, updateProject })(ProjectEdit)
);
