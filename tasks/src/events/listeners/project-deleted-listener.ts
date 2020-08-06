import { Message } from 'node-nats-streaming';
import {
  ProjectDeletedEvent,
  Subjects,
  Listener
} from 'micro-task-manager-common';
import { queueGroupName } from './queue-group-name';
import { Task } from '../../models/task';

export class ProjectDeletedListener extends Listener<ProjectDeletedEvent> {
  readonly subject = Subjects.ProjectDeleted;
  queueGroupName = queueGroupName;

  async onMessage(data: ProjectDeletedEvent['data'], msg: Message) {
    await Task.deleteMany({
      projectId: data.id
    });

    msg.ack();
  }
}
