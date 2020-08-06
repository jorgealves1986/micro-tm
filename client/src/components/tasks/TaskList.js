import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTasks, updateTask } from '../../actions';
import { Link } from 'react-router-dom';
import requireAuth from '../requireAuth';

const TaskList = props => {
  useEffect(() => {
    props.getTasks(props.match.params.projectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderList = tasks => {
    if (!tasks.length) {
      return <div>Nothing to see here...</div>;
    }

    return tasks.map(task => {
      return (
        <div className="item" key={task.id}>
          <div className="right floated content">
            <Link to={`/tasks/edit/${task.id}`} className="ui button primary">
              Edit
            </Link>
            <Link
              to={`/tasks/delete/${task.id}`}
              className="ui button negative"
            >
              Delete
            </Link>
          </div>
          <div className="ui grid" style={{ marginTop: '-3px' }}>
            <input
              type="checkbox"
              autoComplete="off"
              checked={task.completed}
              onChange={() =>
                props.updateTask(task.id, {
                  ...task,
                  completed: !task.completed
                })
              }
              className="one wide column middle aligned"
            />
            <div className="fifteen wide column content">
              <div className="description">{task.description}</div>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderCreate = () => {
    return (
      <div style={{ textAlign: 'right' }}>
        <Link
          to={`/tasks/new/${props.match.params.projectId}`}
          className="ui button primary"
        >
          Create task
        </Link>
      </div>
    );
  };

  return (
    <div>
      <h2>Tasks to do:</h2>
      <div className="ui celled list">
        {renderList(
          props.tasks.filter(
            task =>
              task.completed === false &&
              task.projectId === props.match.params.projectId
          )
        )}
      </div>
      <h2>Tasks completed:</h2>
      <div className="ui celled list">
        {renderList(
          props.tasks.filter(
            task =>
              task.completed === true &&
              task.projectId === props.match.params.projectId
          )
        )}
      </div>
      {renderCreate()}
    </div>
  );
};

const mapStateToProps = state => {
  return { tasks: Object.values(state.tasks) };
};

export default requireAuth(
  connect(mapStateToProps, { getTasks, updateTask })(TaskList)
);
