import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { signup } from '../../test/signup';
import { Task } from '../../models/task';

it('responds with a 401 if not logged in', async () => {
  await request(app)
    .get(`/api/tasks/show/${mongoose.Types.ObjectId().toHexString()}`)
    .send()
    .expect(401);
});

it('returns an error on bad taskId', async () => {
  const { accessToken } = await signup();

  await request(app)
    .get('/api/tasks/show/tyjtyjtyj')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(400);
});

it('returns a 404 if task does not exist', async () => {
  const { accessToken } = await signup();

  await request(app)
    .get(`/api/tasks/show/${mongoose.Types.ObjectId().toHexString()}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(404);
});

it('returns a task', async () => {
  const { accessToken } = await signup();

  const task = Task.build({
    projectId: mongoose.Types.ObjectId().toHexString(),
    description: 'Task 1'
  });
  await task.save();

  const response = await request(app)
    .get(`/api/tasks/show/${task.id}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(200);

  expect(response.body.description).toEqual(task.description);
});
