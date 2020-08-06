import history from '../history';
import {
  signupRequest,
  signinRequest,
  signoutRequest,
  renewAccessTokenRequest,
  getProjectsRequest,
  getProjectRequest,
  newProjectRequest,
  updateProjectRequest,
  deleteProjectRequest,
  getTasksRequest,
  getTaskRequest,
  newTaskRequest,
  updateTaskRequest,
  deleteTaskRequest
} from './requests';
import {
  AUTH_USER,
  AUTH_ERROR,
  NEW_PROJECT,
  GET_PROJECTS,
  GET_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  NEW_TASK,
  GET_TASKS,
  GET_TASK,
  UPDATE_TASK,
  DELETE_TASK
} from './types';
import refreshExpiredToken from '../helpers/refreshExpiredToken';
import { successNotification, errorNotification } from './notifications';
import errorMessageCompiler from '../helpers/errorMessageCompiler';

export const signup = formProps => async dispatch => {
  try {
    const response = await signupRequest(formProps);

    localStorage.setItem('refreshToken', response.data.user.refreshToken);
    localStorage.setItem('accessToken', response.data.accessToken);

    dispatch({
      type: AUTH_USER,
      payload: true
    });
    history.push('/projects/list');
    dispatch(successNotification('Welcome to Task Manager'));
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data.errors || null
    });
    dispatch(errorNotification(errorMessageCompiler(error)));
    console.error(error);
  }
};

export const signin = formProps => async dispatch => {
  try {
    const response = await signinRequest(formProps);

    localStorage.setItem('refreshToken', response.data.user.refreshToken);
    localStorage.setItem('accessToken', response.data.accessToken);

    dispatch({
      type: AUTH_USER,
      payload: true
    });
    history.push('/projects/list');
    dispatch(successNotification('You just logged in'));
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data.errors || null
    });
    dispatch(errorNotification(errorMessageCompiler(error)));
    console.error(error);
  }
};

export const signout = () => {
  return async function signoutThunk(dispatch) {
    try {
      await signoutRequest();

      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');

      dispatch({
        type: AUTH_USER,
        payload: false
      });
      history.push('/');
    } catch (error) {
      if (error.response.data.errors[0].message === 'jwt expired') {
        await refreshExpiredToken();
        signoutThunk(dispatch);
        return;
      }

      dispatch({
        type: AUTH_ERROR,
        payload: error.response.data.errors || null
      });
      dispatch(errorNotification(errorMessageCompiler(error)));
      console.error(error);
    }
  };
};

export const renewAccessToken = () => async dispatch => {
  try {
    if (!localStorage.getItem('refreshToken')) {
      return;
    }

    const response = await renewAccessTokenRequest();

    localStorage.setItem('accessToken', response.data.accessToken);

    dispatch({
      type: AUTH_USER,
      payload: true
    });
  } catch (error) {
    dispatch({
      type: AUTH_USER,
      payload: false
    });
    dispatch(errorNotification(errorMessageCompiler(error)));
    console.error(error);
  }
};

export const forceLogout = () => {
  return {
    type: AUTH_USER,
    payload: false
  };
};

export const getProjects = () => {
  return async function getProjectsThunk(dispatch) {
    try {
      const response = await getProjectsRequest();

      dispatch({ type: GET_PROJECTS, payload: response.data });
    } catch (error) {
      if (error.response.data.errors[0].message === 'jwt expired') {
        await refreshExpiredToken();
        getProjectsThunk(dispatch);
        return;
      }

      dispatch(errorNotification(errorMessageCompiler(error)));
      console.error(error);
    }
  };
};

export const getProject = projectId =>
  async function getProjectThunk(dispatch) {
    try {
      const response = await getProjectRequest(projectId);

      dispatch({ type: GET_PROJECT, payload: response.data });
    } catch (error) {
      if (error.response.data.errors[0].message === 'jwt expired') {
        await refreshExpiredToken();
        getProjectThunk(dispatch);
        return;
      }

      dispatch(errorNotification(errorMessageCompiler(error)));
      console.error(error);
    }
  };

export const newProject = formValues => {
  return async function newProjectThunk(dispatch) {
    try {
      const response = await newProjectRequest(formValues);

      dispatch({ type: NEW_PROJECT, payload: response.data });
      history.push('/projects/list');
      dispatch(successNotification(`Project ${formValues.name} created`));
    } catch (error) {
      if (error.response.data.errors[0].message === 'jwt expired') {
        await refreshExpiredToken();
        newProjectThunk(dispatch);
        return;
      }

      dispatch(errorNotification(errorMessageCompiler(error)));
      console.error(error);
    }
  };
};

export const updateProject = (projectId, formValues) => {
  return async function updateProjectThunk(dispatch) {
    try {
      const response = await updateProjectRequest(projectId, formValues);

      dispatch({ type: UPDATE_PROJECT, payload: response.data });
      history.push('/projects/list');
      dispatch(
        successNotification(`Project ${response.data.name} has been updated`)
      );
    } catch (error) {
      if (error.response.data.errors[0].message === 'jwt expired') {
        await refreshExpiredToken();
        updateProjectThunk(dispatch);
        return;
      }

      dispatch(errorNotification(errorMessageCompiler(error)));
      console.error(error);
    }
  };
};

export const deleteProject = projectId => {
  return async function deleteProjectThunk(dispatch) {
    try {
      await deleteProjectRequest(projectId);

      dispatch({ type: DELETE_PROJECT, payload: projectId });
      history.push('/projects/list');
      dispatch(successNotification('Project deleted'));
    } catch (error) {
      if (error.response.data.errors[0].message === 'jwt expired') {
        await refreshExpiredToken();
        deleteProjectThunk(dispatch);
        return;
      }

      dispatch(errorNotification(errorMessageCompiler(error)));
      console.error(error);
    }
  };
};

export const getTasks = projectId => {
  return async function getTasksThunk(dispatch) {
    try {
      const response = await getTasksRequest(projectId);

      dispatch({ type: GET_TASKS, payload: response.data });
    } catch (error) {
      if (error.response.data.errors[0].message === 'jwt expired') {
        await refreshExpiredToken();
        getTasksThunk(dispatch);
        return;
      }

      dispatch(errorNotification(errorMessageCompiler(error)));
      console.error(error);
    }
  };
};

export const getTask = taskId => {
  return async function getTaskThunk(dispatch) {
    try {
      const response = await getTaskRequest(taskId);

      dispatch({ type: GET_TASK, payload: response.data });
    } catch (error) {
      if (error.response.data.errors[0].message === 'jwt expired') {
        await refreshExpiredToken();
        getTaskThunk(dispatch);
        return;
      }

      dispatch(errorNotification(errorMessageCompiler(error)));
      console.error(error);
    }
  };
};

export const newTask = (formValues, projectId) => {
  return async function newTaskThunk(dispatch) {
    try {
      const response = await newTaskRequest(formValues, projectId);

      dispatch({ type: NEW_TASK, payload: response.data });
      history.push(`/projects/${projectId}`);
      dispatch(successNotification(`Task created`));
    } catch (error) {
      if (error.response.data.errors[0].message === 'jwt expired') {
        await refreshExpiredToken();
        newTaskThunk(dispatch);
        return;
      }

      dispatch(errorNotification(errorMessageCompiler(error)));
      console.error(error);
    }
  };
};

export const updateTask = (taskId, formValues) => {
  return async function updateTaskThunk(dispatch) {
    try {
      const response = await updateTaskRequest(taskId, formValues);

      dispatch({ type: UPDATE_TASK, payload: response.data });

      history.push(`/projects/${formValues.projectId}`);
      dispatch(successNotification('Task updated'));
    } catch (error) {
      if (error.response.data.errors[0].message === 'jwt expired') {
        await refreshExpiredToken();
        updateTaskThunk(dispatch);
        return;
      }

      dispatch(errorNotification(errorMessageCompiler(error)));
      console.error(error);
    }
  };
};

export const deleteTask = (taskId, projectId) => {
  return async function deleteTaskThunk(dispatch) {
    try {
      await deleteTaskRequest(taskId);

      dispatch({ type: DELETE_TASK, payload: taskId });

      history.push(`/projects/${projectId}`);
      dispatch(successNotification('Task deleted'));
    } catch (error) {
      if (error.response.data.errors[0].message === 'jwt expired') {
        await refreshExpiredToken();
        deleteTaskThunk(dispatch);
        return;
      }

      dispatch(errorNotification(errorMessageCompiler(error)));
      console.error(error);
    }
  };
};
