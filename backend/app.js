/*===================================================================*/
/*===================== Package Imports Go Here =====================*/
/*===================================================================*/

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

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


/*====================================================================*/
/*===================== Error Handling Goes Here =====================*/
/*====================================================================*/

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
