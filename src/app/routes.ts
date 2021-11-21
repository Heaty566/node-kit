import express, { Express, json } from 'express';
import cors from 'cors';

import morgan from 'morgan';
import { config } from '../../config';

export const routers = (app: Express) => {
      app.use(json());
      app.use(
            cors({
                  origin: config.CLIENT_URL.split(','),
                  credentials: true,
            })
      );
      app.use(morgan('dev'));
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use(express.static(process.cwd() + '/public'));
      //main routers

      app.get('/*', (req, res) => {
            res.sendFile(process.cwd() + '/public/index.html');
      });
};
