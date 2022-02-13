const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
import './database/connection';


// Settings
app.set('port', 3000);
app.set('views', [path.join(__dirname, 'views'),
                  path.join(__dirname, 'views/routes'),
                  path.join(__dirname, 'views/routes/employee'),
                  path.join(__dirname, 'views/partials')]);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(require('../src/views/routes/index'));

// Statics files
app.use(express.static(path.join(__dirname, 'public')));

// Server listening
app.listen(app.get('port'), () => {
    console.log('\n +----------------------------+');
    console.log(' |    Server on Port: ', app.get('port'), '  |');
    console.log(' +----------------------------+ \n');
});