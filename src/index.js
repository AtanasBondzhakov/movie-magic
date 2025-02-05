import express, { urlencoded } from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import routes from './routes.js';
import ratingHelper from './helpers/rating-helper.js';
import { authMiddleware } from './middlewares/auth-middleware.js';

const app = express();

try {
    const uri = 'mongodb://127.0.0.1:27017/magic-movies';
    await mongoose.connect(uri);

    console.log('DB Connected Successfully!')
} catch (err) {
    console.log('Cannot connect to DB');
    console.error(err.message);
}

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        ratingHelper
    }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use('/static', express.static('src/public'));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware);

app.use(routes);

app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));