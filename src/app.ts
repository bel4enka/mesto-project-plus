import express, { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import { IUserRequest } from './services/interface';
import errorsHandler from './middlewares/error-handler';

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: IUserRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '631b5097f4ce9d83035add27',
  };
  next();
});

app.use(routes);

app.use(errorsHandler);

mongoose.connect('mongodb://localhost:27017/mestodb');
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
