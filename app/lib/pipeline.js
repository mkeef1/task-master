'use strict';

var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('express-method-override');
var home = require('../controllers/home');
//var priorities = require('../controllers/priorties');
//var tasks = require('../controllers/tasks');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', home.index);

//  app.get('/priorities/new', priorities.init);
//  app.post('/priorities', priorities.create);
//  app.get('/tasks/new', tasks.init);
//  app.post('/tasks', tasks.index);
//  app.get('/students/:id', students.show);
//  app.get('/students/:id/test', students.test);
//  app.post('/students/:id/test', students.addTest);

  console.log('Pipeline Configured');
};

