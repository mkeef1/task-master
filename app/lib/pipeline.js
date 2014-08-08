'use strict';

var morgan = require('morgan');
var bodyParser = require('body-parser');
var priorities = require('../controllers/priorities');
var tasks = require('../controllers/tasks');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));

  app.get('/', tasks.index);

/*  app.get('/priorities/new', priorities.init);
  app.get('/priorities', priorities.index);
  app.post('/priorities', priorities.create);

  app.get('/tasks', tasks.index);
  app.post('/tasks', tasks.create);
  app.get('/tasks/new', tasks.init);
  app.post('/tasks/:id/update', tasks.update);
*/
  console.log('Pipeline Configured');
};

