import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProjects } from '../../actions';
import requireAuth from '../requireAuth';

const ProjectList = props => {
  useEffect(() => {
    props.getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderList = () => {
    return props.projects.map(project => {
      return (
        <div className="item" key={project.id}>
          <div className="right floated content">
            <Link
              to={`/projects/edit/${project.id}`}
              className="ui button primary"
            >
              Edit
            </Link>
            <Link
              to={`/projects/delete/${project.id}`}
              className="ui button negative"
            >
              Delete
            </Link>
          </div>
          <i className="large middle aligned icon folder open" />
          <div className="content">
            <Link to={`/projects/${project.id}`} className="header">
              {project.name}
            </Link>
            <div className="description">{project.name}</div>
          </div>
        </div>
      );
    });
  };

  const renderCreate = () => {
    return (
      <div style={{ textAlign: 'right' }}>
        <Link to="/projects/new" className="ui button primary">
          Create project
        </Link>
      </div>
    );
  };

  return (
    <div>
      <h2>Projects</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreate()}
    </div>
  );
};

const mapStateToProps = state => {
  return { projects: Object.values(state.projects) };
};

export default requireAuth(
  connect(mapStateToProps, { getProjects })(ProjectList)
);
