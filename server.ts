// Import NPM Modules
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import frameguard from 'frameguard';
import http from 'http';
import cookieParser from 'cookie-parser';
import ip from 'ip';

// Custom Written Modules
import databaseConnection from '@config/database';
import accessControl from '@middlewares/accessControl';
import xssMiddleware from '@middlewares/xssMiddleware';
import config from '@config/index';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const app = express();

app.use(morgan('dev'));
app.use(accessControl);
app.use(cors({ origin: '*' }));
app.use(xssMiddleware);
app.use(frameguard({ action: 'sameorigin' }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./public'));

let myip = ip.address();
console.log(`IP : ${myip}`);

let server = http.createServer(app);

app.get('/test', (req: any, res: any) => {
  return res.json({ success: true, message: 'Server runs successfully' });
});

databaseConnection((isConnected: boolean) => {
  if (isConnected) {
    server.listen(config.PORT, () => {
        console.log(`\x1b[33mServer runs in port ${config.PORT}...`)
    });
  }
});
