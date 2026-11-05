import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandler from './_middleware/error-handler';
import accountsController from './accounts/accounts.controller';
import swaggerDocs from './_helpers/swagger';
import db, { dbReady } from './_helpers/db';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// home page -> API docs
app.get('/', (req, res) => res.redirect('/api-docs'));

// swagger docs route (works even without a database)
app.use('/api-docs', swaggerDocs);

// api routes wait until the database is ready
app.use('/accounts', async (req, res, next) => {
    await dbReady;
    if (db.error) return res.status(503).json({ message: 'Database is not available right now' });
    next();
}, accountsController);

// global error handler
app.use(errorHandler);

// start server (Vercel runs the exported app itself)
if (!process.env.VERCEL) {
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log('Server listening on port ' + port));
}

export default app;
