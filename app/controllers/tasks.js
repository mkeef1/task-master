'use strict';

var Task = require('../models/task');
var Priority = require('../models/priority');

exports.init = function(req, res){
  Priority.all(function(priorities){
    res.render('tasks/new', {priorities:priorities});
  });
};

exports.create = function(req, res){
  var task = new Task(req.body);
  task.save(function(){
    res.redirect('/tasks');
  });
};
