import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import {
  errorHandler,
  NotFoundError,
  currentUser
} from 'micro-task-manager-common';
import { newTaskRouter } from './routes/new';
import { deleteTaskRouter } from './routes/delete';
import { indexTaskRouter } from './routes';
import { showTaskRouter } from './routes/show';
import { updateTaskRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(currentUser);

app.use(newTaskRouter);
app.use(deleteTaskRouter);
app.use(showTaskRouter);
app.use(indexTaskRouter);
app.use(updateTaskRouter);

app.all('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
