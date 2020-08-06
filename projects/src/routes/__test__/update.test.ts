import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { signup } from '../../test/signup';
import { Project } from '../../models/project';

it('responds with a 401 if not logged in', async () => {
  await request(app)
    .put(`/api/projects/${mongoose.Types.ObjectId().toHexString()}`)
    .send({
      name: 'Project updated'
    })
    .expect(401);
});

it('responds with a 400 on bad projectId', async () => {
  const { accessToken } = await signup();

  await request(app)
    .put(`/api/projects/${mongoose.Types.ObjectId().toHexString()}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(400);
});

it('responds with a 400 when no name is provided', async () => {
  const { accessToken } = await signup();

  await request(app)
    .put('/api/projects/4rthrt4h94r9h')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(400);

  await request(app)
    .put(`/api/projects/${mongoose.Types.ObjectId().toHexString()}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: ''
    })
    .expect(400);

  await request(app)
    .put(`/api/projects/${mongoose.Types.ObjectId().toHexString()}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: '    '
    })
    .expect(400);
});

it('responds with a 404 if project does not exists', async () => {
  const { accessToken } = await signup();

  await request(app)
    .put(`/api/projects/${mongoose.Types.ObjectId().toHexString()}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: 'Project updated'
    })
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
    .put(`/api/projects/${project.id}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: 'Project updated'
    })
    .expect(401);
});

it('updates a record', async () => {
  const { user, accessToken } = await signup();

  const project = Project.build({
    userId: user.id,
    name: 'Proj 1'
  });
  await project.save();

  const response = await request(app)
    .put(`/api/projects/${project.id}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: 'Project updated'
    })
    .expect(200);

  expect(response.body.name).toEqual('Project updated');
});
