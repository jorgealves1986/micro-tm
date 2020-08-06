import {
  Publisher,
  Subjects,
  ProjectDeletedEvent
} from 'micro-task-manager-common';

export class ProjectDeletedPublisher extends Publisher<ProjectDeletedEvent> {
  readonly subject = Subjects.ProjectDeleted;
}
