import auth from '../apis/auth';
import projects from '../apis/projects';
import tasks from '../apis/tasks';

export const signupRequest = async formValues => {
  return auth.post('/signup', formValues);
};

export const signinRequest = async formValues => {
  return auth.post('/signin', formValues);
};

export const signoutRequest = async () => {
  await auth.post(
    '/signout',
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }
  );
};

export const renewAccessTokenRequest = async () => {
  return auth.post('/token', {
    token: localStorage.getItem('refreshToken')
  });
};

export const getProjectsRequest = async () => {
  return projects.get('', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
};

export const getProjectRequest = async projectId => {
  return projects.get(`/${projectId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
};

export const newProjectRequest = async formValues => {
  return projects.post(
    '',
    {
      ...formValues
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }
  );
};

export const updateProjectRequest = async (projectId, formValues) => {
  return projects.put(`/${projectId}`, formValues, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
};

export const deleteProjectRequest = async projectId => {
  await projects.delete(`/${projectId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
};

export const getTasksRequest = async projectId => {
  return tasks.get(`/${projectId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
};

export const getTaskRequest = async taskId => {
  return tasks.get(`/show/${taskId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
};

export const newTaskRequest = async (formValues, projectId) => {
  return tasks.post(
    '',
    {
      ...formValues,
      projectId
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }
  );
};

export const updateTaskRequest = async (taskId, formValues) => {
  return tasks.put(`/${taskId}`, formValues, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
};

export const deleteTaskRequest = async taskId => {
  await tasks.delete(`/${taskId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
};
