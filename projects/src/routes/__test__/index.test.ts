import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { signup } from '../../test/signup';
import { Project } from '../../models/project';

it('responds with a 401 if not logged in', async () => {
  await request(app).get('/api/projects').send().expect(401);
});

it('returns an empty array', async () => {
  const { accessToken } = await signup();

  const response = await request(app)
    .get('/api/projects')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(0);
});

it('returns an array of projects', async () => {
  const { user, accessToken } = await signup();

  const projectOne = Project.build({
    userId: user.id,
    name: 'Project 1'
  });
  await projectOne.save();

  const projectTwo = Project.build({
    userId: user.id,
    name: 'Project 2'
  });
  await projectTwo.save();

  const projectThree = Project.build({
    userId: mongoose.Types.ObjectId().toHexString(),
    name: 'Project 3'
  });
  await projectThree.save();

  const response = await request(app)
    .get('/api/projects')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(2);
  expect(response.body[0].name).toEqual(projectOne.name);
  expect(response.body[1].name).toEqual(projectTwo.name);
});
