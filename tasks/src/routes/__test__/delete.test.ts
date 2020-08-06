import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { signup } from '../../test/signup';
import { Task } from '../../models/task';

it('responds with a 401 if not logged in', async () => {
  await request(app)
    .delete(`/api/tasks/${mongoose.Types.ObjectId().toHexString()}`)
    .send()
    .expect(401);
});

it('responds with an error on bad taskId', async () => {
  const { accessToken } = await signup();

  await request(app)
    .delete('/api/tasks/tyjtyjjartj')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(400);
});

it('responds with a 404 if task does not exists', async () => {
  const { accessToken } = await signup();

  await request(app)
    .delete(`/api/tasks/${mongoose.Types.ObjectId().toHexString()}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(404);
});

it('deletes a record', async () => {
  const { user, accessToken } = await signup();

  const task = Task.build({
    projectId: mongoose.Types.ObjectId().toHexString(),
    description: 'Task 1'
  });
  await task.save();

  await request(app)
    .delete(`/api/tasks/${task.id}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(204);
});
