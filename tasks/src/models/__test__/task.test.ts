import mongoose from 'mongoose';
import { Task } from '../task';

it('implements optimistic concurrency control', async done => {
  const task = Task.build({
    projectId: mongoose.Types.ObjectId().toHexString(),
    description: 'First task',
    completed: false
  });

  await task.save();

  const firstInstance = await Task.findById(task.id);
  const secondInstance = await Task.findById(task.id);

  firstInstance!.set({ description: 'First task updated' });
  secondInstance!.set({ description: 'First task updated again' });

  await firstInstance!.save();

  try {
    await secondInstance!.save();
  } catch (err) {
    return done();
  }

  throw new Error('Should not reach this point');
});

it('increments the version number on multiple saves', async () => {
  const task = Task.build({
    projectId: mongoose.Types.ObjectId().toHexString(),
    description: 'First task',
    completed: false
  });
  await task.save();
  expect(task.version).toEqual(0);

  await task.save();
  expect(task.version).toEqual(1);

  await task.save();
  expect(task.version).toEqual(2);
});
