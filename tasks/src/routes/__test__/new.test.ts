import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { signup } from '../../test/signup';

it('responds with a 401 if not logged in', async () => {
  await request(app)
    .post('/api/tasks')
    .send({
      projectId: mongoose.Types.ObjectId().toHexString(),
      description: 'Task 1'
    })
    .expect(401);
});

it('returns an error on bad attributes', async () => {
  const { accessToken } = await signup();

  await request(app)
    .post('/api/tasks')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      projectId: '',
      description: 'Task 1'
    })
    .expect(400);

  await request(app)
    .post('/api/tasks')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      projectId: 'rgerg49er6g',
      description: 'Task 1'
    })
    .expect(400);

  await request(app)
    .post('/api/tasks')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      projectId: mongoose.Types.ObjectId().toHexString(),
      description: ''
    })
    .expect(400);

  await request(app)
    .post('/api/tasks')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(400);
});

it('creates a new task', async () => {
  const { accessToken } = await signup();

  await request(app)
    .post('/api/tasks')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      projectId: mongoose.Types.ObjectId().toHexString(),
      description: 'Task 1'
    })
    .expect(201);
});
