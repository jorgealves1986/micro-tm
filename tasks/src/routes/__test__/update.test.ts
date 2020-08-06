import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { signup } from '../../test/signup';
import { Task } from '../../models/task';

it('responds with a 401 if not logged in', async () => {
  await request(app)
    .put(`/api/tasks/${mongoose.Types.ObjectId().toHexString()}`)
    .send({
      projectId: mongoose.Types.ObjectId().toHexString(),
      description: 'Task 1 updated'
    })
    .expect(401);
});

it('responds with a 400 on bad projectId', async () => {
  const { accessToken } = await signup();

  await request(app)
    .put(`/api/tasks/grreeheh5373`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(400);
});

it('responds with a 400 when arguments are invalid/missing', async () => {
  const { accessToken } = await signup();

  await request(app)
    .put('/api/tasks/4rthrt4h94r9h')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(400);

  await request(app)
    .put(`/api/tasks/${mongoose.Types.ObjectId().toHexString()}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      projectId: mongoose.Types.ObjectId().toHexString()
    })
    .expect(400);

  await request(app)
    .put(`/api/tasks/${mongoose.Types.ObjectId().toHexString()}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      description: 'Task 1'
    })
    .expect(400);
});

it('responds with a 404 if task does not exists', async () => {
  const { accessToken } = await signup();

  await request(app)
    .put(`/api/tasks/${mongoose.Types.ObjectId().toHexString()}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      projectId: mongoose.Types.ObjectId().toHexString(),
      description: 'Task 1 updated',
      completed: true
    })
    .expect(404);
});

it('updates a record', async () => {
  const { accessToken } = await signup();

  const task = Task.build({
    projectId: mongoose.Types.ObjectId().toHexString(),
    description: 'Task 1'
  });
  await task.save();

  const response = await request(app)
    .put(`/api/tasks/${task.id}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      projectId: task.projectId,
      description: 'Task 1 updated',
      completed: true
    })
    .expect(200);

  expect(response.body.description).toEqual('Task 1 updated');
  expect(response.body.completed).toEqual(true);
});
