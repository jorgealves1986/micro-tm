import auth from '../apis/auth';
import projects from '../apis/projects';
import tasks from '../apis/tasks';
import { getRefreshToken } from '../helpers/localStorageService';

export const signupRequest = async formValues => {
  return auth.post('/signup', formValues);
};

export const signinRequest = async formValues => {
  return auth.post('/signin', formValues);
};

export const signoutRequest = async () => {
  await auth.post('/signout', {});
};

export const renewAccessTokenRequest = async () => {
  return auth.post('/token', {
    token: getRefreshToken()
  });
};

export const getProjectsRequest = async () => {
  return projects.get('');
};

export const getProjectRequest = async projectId => {
  return projects.get(`/${projectId}`);
};

export const newProjectRequest = async formValues => {
  return projects.post('', {
    ...formValues
  });
};

export const updateProjectRequest = async (projectId, formValues) => {
  return projects.put(`/${projectId}`, formValues);
};

export const deleteProjectRequest = async projectId => {
  await projects.delete(`/${projectId}`);
};

export const getTasksRequest = async projectId => {
  return tasks.get(`/${projectId}`);
};

export const getTaskRequest = async taskId => {
  return tasks.get(`/show/${taskId}`);
};

export const newTaskRequest = async (formValues, projectId) => {
  return tasks.post('', {
    ...formValues,
    projectId
  });
};

export const updateTaskRequest = async (taskId, formValues) => {
  return tasks.put(`/${taskId}`, formValues);
};

export const deleteTaskRequest = async taskId => {
  await tasks.delete(`/${taskId}`);
};
