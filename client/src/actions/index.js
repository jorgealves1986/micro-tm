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
import {
  setRefreshToken,
  setAccessToken,
  clearTokens,
  getRefreshToken,
  getAccessToken
} from '../helpers/localStorageService';
import setHeaders from '../helpers/setHeaders';

export const signup = formProps => async dispatch => {
  try {
    const response = await signupRequest(formProps);

    setRefreshToken(response.data.user.refreshToken);
    setAccessToken(response.data.accessToken);

    setHeaders(response.data.accessToken);

    dispatch({
      type: AUTH_USER,
      payload: true
    });
    history.push('/projects/list');
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data.errors || null
    });
    console.error(error);
  }
};

export const signin = formProps => async dispatch => {
  try {
    const response = await signinRequest(formProps);

    setRefreshToken(response.data.user.refreshToken);
    setAccessToken(response.data.accessToken);

    setHeaders(response.data.accessToken);

    dispatch({
      type: AUTH_USER,
      payload: true
    });
    history.push('/projects/list');
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data.errors || null
    });
    console.error(error);
  }
};

export const signout = () => {
  return async dispatch => {
    try {
      await signoutRequest();

      clearTokens();

      dispatch({
        type: AUTH_USER,
        payload: false
      });
      history.push('/');
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
        payload: error.response.data.errors || null
      });
      console.error(error);
    }
  };
};

export const renewAccessToken = () => async dispatch => {
  try {
    if (!getRefreshToken()) {
      dispatch({
        type: AUTH_USER,
        payload: false
      });
      return;
    }
    if (getAccessToken()) {
      setHeaders(getAccessToken());
      dispatch({
        type: AUTH_USER,
        payload: true
      });
      return;
    }

    const response = await renewAccessTokenRequest();

    setAccessToken(response.data.accessToken);
    setHeaders(response.data.accessToken);

    dispatch({
      type: AUTH_USER,
      payload: true
    });
  } catch (error) {
    dispatch({
      type: AUTH_USER,
      payload: false
    });
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
  return async dispatch => {
    try {
      const response = await getProjectsRequest();

      dispatch({ type: GET_PROJECTS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getProject = projectId => async dispatch => {
  try {
    const response = await getProjectRequest(projectId);

    dispatch({ type: GET_PROJECT, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const newProject = formValues => {
  return async dispatch => {
    try {
      const response = await newProjectRequest(formValues);

      dispatch({ type: NEW_PROJECT, payload: response.data });
      history.push('/projects/list');
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateProject = (projectId, formValues) => {
  return async dispatch => {
    try {
      const response = await updateProjectRequest(projectId, formValues);

      dispatch({ type: UPDATE_PROJECT, payload: response.data });
      history.push('/projects/list');
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteProject = projectId => {
  return async dispatch => {
    try {
      await deleteProjectRequest(projectId);

      dispatch({ type: DELETE_PROJECT, payload: projectId });
      history.push('/projects/list');
    } catch (error) {
      console.error(error);
    }
  };
};

export const getTasks = projectId => {
  return async dispatch => {
    try {
      const response = await getTasksRequest(projectId);

      dispatch({ type: GET_TASKS, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getTask = taskId => {
  return async dispatch => {
    try {
      const response = await getTaskRequest(taskId);

      dispatch({ type: GET_TASK, payload: response.data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const newTask = (formValues, projectId) => {
  return async dispatch => {
    try {
      const response = await newTaskRequest(formValues, projectId);

      dispatch({ type: NEW_TASK, payload: response.data });
      history.push(`/projects/${projectId}`);
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateTask = (taskId, formValues) => {
  return async dispatch => {
    try {
      const response = await updateTaskRequest(taskId, formValues);

      dispatch({ type: UPDATE_TASK, payload: response.data });

      history.push(`/projects/${formValues.projectId}`);
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteTask = (taskId, projectId) => {
  return async dispatch => {
    try {
      await deleteTaskRequest(taskId);

      dispatch({ type: DELETE_TASK, payload: taskId });

      history.push(`/projects/${projectId}`);
    } catch (error) {
      console.error(error);
    }
  };
};
