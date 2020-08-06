import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import {
  errorHandler,
  NotFoundError,
  currentUser
} from 'micro-task-manager-common';
import { newProjectRouter } from './routes/new';
import { showProjectRouter } from './routes/show';
import { indexProjectRouter } from './routes/index';
import { deleteProjectRouter } from './routes/delete';
import { updateProjectRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(currentUser);

app.use(newProjectRouter);
app.use(showProjectRouter);
app.use(indexProjectRouter);
app.use(deleteProjectRouter);
app.use(updateProjectRouter);

app.all('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
