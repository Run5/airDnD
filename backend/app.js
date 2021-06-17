/*===================================================================*/
/*===================== Package Imports Go Here =====================*/
/*===================================================================*/

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');


/*================================================================*/
/*===================== File Imports Go Here =====================*/
/*================================================================*/

const routes = require('./routes');


/*==================================================================*/
/*===================== Project Initialization =====================*/
/*==================================================================*/

// isProduction will be true if the enviornment is in production
const { environment } = require('./config');
const isProduction = environment === 'production';

// initialize the Express App
const app = express();


/*================================================================*/
/*===================== Middleware Goes Here =====================*/
/*================================================================*/

// middleware for logging info, req/res
app.use(morgan('dev'));

//middleware for parsing cookies
app.use(cookieParser());

//middleware for parsing JSON bodies of requests
app.use(express.json());

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}
// helmet helps set a variety of headers to better secure your app
app.use(helmet({
  contentSecurityPolicy: false
}));

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
    secure: isProduction,
    sameSite: isProduction && "Lax",
    httpOnly: true,
    },
  })
);

// Connect all the routes
app.use(routes);



module.exports = app;
