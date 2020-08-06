import { v4 as uuidv4 } from 'uuid';

export const signupRequest = formValues => {
  return Promise.resolve({
    data: {
      user: {
        email: formValues.email,
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdiNGM3MTg1YmU3MDAyMzJhZjBjMyIsImVtYWlsIjoidGVzdDNAdGVzdC5jb20iLCJpYXQiOjE1OTY0Mzc3MDN9.SMKkzqxf5SYeOy42tK6qLQngL4ZJWGKUq9IlOwD5ZSY',
        id: '5f27b4c7185be700232af0c3'
      },
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdiNGM3MTg1YmU3MDAyMzJhZjBjMyIsImVtYWlsIjoidGVzdDNAdGVzdC5jb20iLCJpYXQiOjE1OTY0Mzc3MDMsImV4cCI6MTU5NjQzODYwM30.VE5qxwVNxgD64rJW6nYfL3CyXXLil7aIUjx-3Wjjq3M'
    }
  });
};

export const signinRequest = async formValues => {
  return Promise.resolve({
    data: {
      user: {
        email: formValues.email,
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdiNGM3MTg1YmU3MDAyMzJhZjBjMyIsImVtYWlsIjoidGVzdDNAdGVzdC5jb20iLCJpYXQiOjE1OTY0Mzc3MDN9.SMKkzqxf5SYeOy42tK6qLQngL4ZJWGKUq9IlOwD5ZSY',
        id: '5f297db50a45660023296d95'
      },
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdiNGM3MTg1YmU3MDAyMzJhZjBjMyIsImVtYWlsIjoidGVzdDNAdGVzdC5jb20iLCJpYXQiOjE1OTY0Mzc3MDMsImV4cCI6MTU5NjQzODYwM30.VE5qxwVNxgD64rJW6nYfL3CyXXLil7aIUjx-3Wjjq3M'
    }
  });
};

export const signoutRequest = async () => {
  return Promise.resolve();
};

export const renewAccessTokenRequest = async () => {
  return Promise.resolve({
    data: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMjdiNGM3MTg1YmU3MDAyMzJhZjBjMyIsImVtYWlsIjoidGVzdDNAdGVzdC5jb20iLCJpYXQiOjE1OTY0Mzc3MDMsImV4cCI6MTU5NjQzODYwM30.VE5qxwVNxgD64rJW6nYfL3CyXXLil7aIUjx-3Wjjq3M'
    }
  });
};

export const getProjectsRequest = async () => {
  return Promise.resolve({
    data: []
  });
};

export const getProjectRequest = async projectId => {
  return Promise.resolve({
    data: {}
  });
};

export const newProjectRequest = async formValues => {
  return Promise.resolve({
    data: {
      userId: '5f297db50a45660023296d95',
      name: formValues.name,
      __v: 0,
      id: uuidv4()
    }
  });
};

export const updateProjectRequest = async (projectId, formValues) => {
  return Promise.resolve({
    data: {
      userId: '5f297db50a45660023296d95',
      name: formValues.name,
      __v: 0,
      id: projectId
    }
  });
};

export const deleteProjectRequest = async projectId => {
  return Promise.resolve();
};

export const getTasksRequest = async projectId => {
  return Promise.resolve({
    data: []
  });
};

export const getTaskRequest = async taskId => {
  return Promise.resolve({
    data: {}
  });
};

export const newTaskRequest = async (formValues, projectId) => {
  return Promise.resolve({
    data: {
      completed: false,
      projectId: projectId,
      description: formValues.description,
      version: 0,
      id: uuidv4()
    }
  });
};

export const updateTaskRequest = async (taskId, formValues) => {
  return Promise.resolve({
    data: {
      completed: formValues.completed,
      projectId: formValues.projectId,
      description: formValues.description,
      version: 0,
      id: taskId
    }
  });
};

export const deleteTaskRequest = async taskId => {
  return Promise.resolve();
};
