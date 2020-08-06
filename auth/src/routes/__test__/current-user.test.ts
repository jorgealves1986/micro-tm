import request from 'supertest';
import { app } from '../../app';
import { signup } from '../../test/signup';

it('responds with details about the current user', async () => {
  const { accessToken } = await signup();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
