import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { signup } from '../../test/signup';
import { Project } from '../../models/project';

it('responds with a 401 if not logged in', async () => {
  await request(app)
    .get(`/api/projects/${mongoose.Types.ObjectId().toHexString()}`)
    .send()
    .expect(401);
});

it('responds with a 400 on bad projectId', async () => {
  const { accessToken } = await signup();

  await request(app)
    .get('/api/projects/4rthrt4h94r9h')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(400);
});

it('responds with a 404 if project does not exists', async () => {
  const { accessToken } = await signup();

  await request(app)
    .get(`/api/projects/${mongoose.Types.ObjectId().toHexString()}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(404);
});

it('responds with a 401 if trying to get projects from other user', async () => {
  const project = Project.build({
    userId: mongoose.Types.ObjectId().toHexString(),
    name: 'Proj 1'
  });
  await project.save();

  const { accessToken } = await signup();

  await request(app)
    .get(`/api/projects/${project.userId}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(404);
});

it('responds with the project', async () => {
  const { user, accessToken } = await signup();

  const project = Project.build({
    userId: user.id,
    name: 'Proj 1'
  });
  await project.save();

  const response = await request(app)
    .get(`/api/projects/${project.id}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(200);

  expect(response.body.userId).toEqual(user.id);
  expect(response.body.name).toEqual(project.name);
});
