import Express from 'express';
const express = Express;
const app = Express();

import Path from 'path'
const path = Path;

import BodyParser from 'body-parser';
const bodyParser = BodyParser;

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Settings
app.set('port', 3000);
app.set('views', [path.join(__dirname, 'public'),
                  path.join(__dirname, 'public/html'),
                  path.join(__dirname, 'views/routes'),
                  path.join(__dirname, 'views/routes/employee'),
                  path.join(__dirname, 'views/partials')]);
app.engine('html', import('ejs').renderFile);
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use(require('./source/modules/employee/models-empl'));

// Statics files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/js')));
// Server listening
app.listen(app.get('port'), () => {
    console.log('\n +----------------------------+');
    console.log(' |    Server on Port: ', app.get('port'), '  |');
    console.log(' +----------------------------+ \n');
});