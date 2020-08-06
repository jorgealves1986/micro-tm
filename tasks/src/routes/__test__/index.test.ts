import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { signup } from '../../test/signup';
import { Task } from '../../models/task';

it('responds with a 401 if not logged in', async () => {
  await request(app)
    .get(`/api/tasks/${mongoose.Types.ObjectId().toHexString()}`)
    .send()
    .expect(401);
});

it('returns an error on bad projectId', async () => {
  const { accessToken } = await signup();

  await request(app)
    .get('/api/tasks/ytjtyjj566')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(400);
});

it('returns an empty array', async () => {
  const { accessToken } = await signup();

  const response = await request(app)
    .get(`/api/tasks/${mongoose.Types.ObjectId().toHexString()}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(0);
});

it('returns an array of tasks', async () => {
  const { accessToken } = await signup();
  const projectId = mongoose.Types.ObjectId().toHexString();

  const taskOne = Task.build({
    projectId,
    description: 'Task 1'
  });
  await taskOne.save();

  const taskTwo = Task.build({
    projectId,
    description: 'Task 2'
  });
  await taskTwo.save();

  const taskThree = Task.build({
    projectId: mongoose.Types.ObjectId().toHexString(),
    description: 'Task 3'
  });
  await taskThree.save();

  const response = await request(app)
    .get(`/api/tasks/${projectId}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(2);
  expect(response.body[0].description).toEqual(taskOne.description);
  expect(response.body[1].description).toEqual(taskTwo.description);
});
