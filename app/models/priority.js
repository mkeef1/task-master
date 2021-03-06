'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');

function Priority(p){
  this._id = p._id;
  this.name = p.name;
  this.color = p.color;
  this.value = p.value;
}

Object.defineProperty(Priority, 'collection', {
  get: function(){return global.mongodb.collection('priorities');}
});

Priority.prototype.save = function(cb){
  Priority.collection.save(this, cb);
};

Priority.all = function(cb){
  Priority.collection.find().toArray(function(err, objects){

    console.log(err, objects);

    var priorities = objects.map(function(o){
      return changePrototype(o);
    });
    cb(priorities);
  });
};

Priority.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Priority.collection.findOne({_id:_id}, function(err, obj){
    var priority = changePrototype(obj);

    cb(priority);
  });
};

function changePrototype(obj){
  return _.create(Priority.prototype, obj);
}

module.exports = Priority;
