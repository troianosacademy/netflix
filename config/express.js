const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const routesAdmin = require('../app/routes/admin');
const routesFrontend = require('../app/routes/frontend');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

nunjucks.configure(path.join(__dirname, '/../app/views'), {
  autoescape: true,
  express: app
});

app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: 'tmp/'
}));

app.use('/admin', routesAdmin);
app.use('/', routesFrontend);

module.exports = app;
