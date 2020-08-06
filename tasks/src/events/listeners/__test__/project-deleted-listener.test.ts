import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { ProjectDeletedEvent } from 'micro-task-manager-common';
import { natsWrapper } from '../../../nats-wrapper';
import { ProjectDeletedListener } from '../project-deleted-listener';
import { Task } from '../../../models/task';

const setup = async () => {
  const listener = new ProjectDeletedListener(natsWrapper.client);

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

  const data: ProjectDeletedEvent['data'] = {
    id: projectId
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, data, msg, taskOne, taskTwo, taskThree };
};

it('deletes the tasks', async () => {
  const { listener, data, msg, taskThree } = await setup();

  await listener.onMessage(data, msg);

  const deletedTasks = await Task.find({ projectId: data.id });

  const remainingTask = await Task.findById(taskThree.id);

  expect(deletedTasks.length).toEqual(0);
  expect(remainingTask).toBeDefined();
  expect(remainingTask!.description).toEqual(taskThree.description);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
