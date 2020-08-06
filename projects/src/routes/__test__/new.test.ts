import request from 'supertest';
import { app } from '../../app';
import { signup } from '../../test/signup';

it('responds with a 401 if not logged in', async () => {
  await request(app)
    .post('/api/projects')
    .send({
      name: 'proj 1'
    })
    .expect(401);
});

it('returns an error on bad attributes', async () => {
  const { accessToken } = await signup();

  await request(app)
    .post('/api/projects')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: ''
    })
    .expect(400);

  await request(app)
    .post('/api/projects')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(400);
});

it('creates a new project', async () => {
  const { accessToken } = await signup();

  await request(app)
    .post('/api/projects')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: 'proj 1'
    })
    .expect(201);
});
