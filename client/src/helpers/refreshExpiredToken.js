import auth from '../apis/auth';
import { forceLogout } from '../actions';

export default async () => {
  try {
    if (!localStorage.getItem('refreshToken')) {
      throw new Error('No refresh token found!');
    }

    const response = await auth.post('/token', {
      token: localStorage.getItem('refreshToken')
    });

    localStorage.setItem('accessToken', response.data.accessToken);
  } catch (error) {
    console.error(error);
    forceLogout();
  }
};
