/* jshint expr: true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Task = require('../../app/models/task');
var dbConnect = require('../../app/lib/mongodb');
var Priority = require('../../app/models/priority');
var Mongo = require('mongodb');
//var moment = require('moment');
var p1, t1;

describe('Task', function(){
  before(function(done){
    dbConnect('Task-master', function(){
      done();
    });
  });

  beforeEach(function(done){
    Task.collection.remove(function(){
      Priority.collection.remove(function(){
        var p = {name:'high', color:'red', value:'10'};
        p1 = new Priority(p);
        p1.insert(function(){
        var t = {name:'get milk', due:'08/10/2014', photo:'http://www.cdc.gov/foodsafety/images/rawmilk/milk_home.jpg', isComplete:true, tags:'groceries', priorityID:p1._id};
        t1 = new Task(t);
          t1.insert(function(){
            done();
          });
        });
      });
    });
  });
  

  describe('#insert', function(){
    it('should insert a task', function(done){
      t1.insert(function(){
        expect(t1._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  
  describe('constructor', function(){
    it('should create a new Task object', function(){

      expect(t1).to.be.instanceof(Task);
      expect(t1.name).to.equal('get milk');
      expect(t1.due).to.equal('08/10/2014');
      expect(t1.photo).to.equal('http://www.cdc.gov/foodsafety/images/rawmilk/milk_home.jpg');
      expect(t1.isComplete).to.equal(true);
      expect(t1.tags).to.equal('groceries');
      expect(t1.priorityID).to.be.instanceof(Mongo.ObjectID);
    });
  });  
  
  describe('.all', function(){
    it('should get all tasks from database', function(done){
      Task.all(function(tasks){
        console.log(tasks);
        expect(tasks).to.have.length(1);
        expect(tasks[0]).to.be.instanceof(Task);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a task by its id', function(done){
      Task.findById(t1._id.toString(), function(task){
        expect(t1.name).to.equal('get milk');
        expect(t1).to.be.instanceof(Task);
        done();
      });
    });
  });

});

