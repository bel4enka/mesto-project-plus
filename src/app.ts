import express from 'express';
import mongoose from 'mongoose';
import { celebrate, Joi, errors } from 'celebrate';
import { errorLogger, requestLogger } from './middlewares/logger';
import routes from './routes';
import errorsHandler from './middlewares/error-handler';
import auth from './middlewares/auth';
import { createUser, loginUser } from './controllers/user';
import urlRegexp from './helpers/regexp';

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), loginUser);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri().pattern(urlRegexp),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), createUser);
// @ts-ignore
app.use(auth);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

mongoose.connect('mongodb://localhost:27017/mestodb');
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
