import auth from '../apis/auth';
import projects from '../apis/projects';
import tasks from '../apis/tasks';

const setHeaders = accessToken => {
  auth.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  projects.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  tasks.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};

export default setHeaders;
