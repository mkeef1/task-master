'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');
var moment = require('moment');

function Task(t){
  this.name = t.name;
  this.due = moment(t.due).format('MM/DD/YYYY');
  this.photo = t.photo;
  this.isComplete = t.isComplete;
  this.tags = t.tags;
  this.priorityID = t.priorityID;
}

Object.defineProperty(Task, 'collection', {
  get: function(){return global.mongodb.collection('task');}
});

Task.prototype.insert = function(cb){
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

module.exports = Task;

function changePrototype(obj){
  return _.create(Task.prototype, obj);
}

