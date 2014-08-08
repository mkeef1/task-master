'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');
var moment = require('moment');
//var Priority = require('./priority');

function Task(tas){
  this.name = tas.name;
  this.due = moment(tas.due).format('MM/DD/YYYY');
  this.photo = tas.photo;
  this.isComplete = false;
  this.tags = tas.tags;
  this.priorityID = Mongo.ObjectID(tas.priorityID);
}

Object.defineProperty(Task, 'collection', {
  get: function(){return global.mongodb.collection('task');}
});

Task.prototype.save = function(cb){
  Task.collection.save(this, cb);
};

Task.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Task.collection.findOne({_id:_id}, function(err, obj){
    var task = changePrototype(obj);

    cb(task);
  });
};

Task.all = function(cb){
  Task.collection.find().limit(3).toArray(function(err, objects){
    var tasks = objects.map(function(o){
      return changePrototype(o);
    });

    cb(tasks);
  });

};


function changePrototype(obj){
  return _.create(Task.prototype, obj);
}

module.exports = Task;
