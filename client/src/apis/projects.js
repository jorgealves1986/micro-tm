import axios from 'axios';

export default axios.create({
  baseURL: 'https://taskmanager.dev/api/projects'
});
