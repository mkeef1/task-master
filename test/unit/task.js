/* jshint expr: true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Task = require('../../app/models/task');
var dbConnect = require('../../app/lib/mongodb');
var Priority = require('../../app/models/priority');
var Mongo = require('mongodb');
//var moment = require('moment');
var p1, p2, p3;
var t1, t2, t3, t4, t5, t6;
var s1 = {name:'high', color:'red', value:'9'};
var s2 = {name:'medium', color:'yellow', value:'7'};
var s3 = {name:'low', color:'green', value:'5'};

describe('Task', function(){
  before(function(done){
    dbConnect('Task-master', function(){
      done();
    });
  });

  beforeEach(function(done){
    Task.collection.remove(function(){
      Priority.collection.remove(function(){
        p1 = new Priority(s1);
        p2 = new Priority(s2);
        p3 = new Priority(s3);
        p1.save(function(){
          p2.save(function(){
            p3.save(function(){
              var td1 = {name:'get milk', due:'04/10/2014', photo:'http://www.cdc.gov/foodsafety/images/rawmilk/milk_home.jpg', isComplete:true, tags:'groceries, dairy, liquid', priorityID:p1._id.toString()};
              var td2 = {name:'do homeword', due:'05/16/2014', photo:'http://mredson.weebly.com/uploads/9/1/1/1/9111733/1118284_orig.gif', isComplete:true, tags:'homework, coding, school', priorityID:p2._id.toString()};
              var td3 = {name:'walk the dog', due:'02/20/2014', photo:'https://lh5.googleusercontent.com/-kq7OtwHypS8/TYKTAqbUn8I/AAAAAAAAAEI/c0JaQGN21O8/s1600/DOG+WALKING+2.jpg', isComplete:true, tags:'walk, dog, park', priorityID:p3._id.toString()};
              var td4 = {name:'get bread', due:'03/11/2014', photo:'http://i.telegraph.co.uk/multimedia/archive/01807/bread_1807973b.jpg', isComplete:true, tags:'groceries, loaf, whole grain', priorityID:p1._id.toString()};
              var td5 = {name:'play drums', due:'04/18/2014', photo:'http://upload.wikimedia.org/wikipedia/commons/f/fe/Drum_kit_illustration.png', isComplete:true, tags:'music, practice, fun', priorityID:p2._id.toString()};
              var td6 = {name:'take a nap', due:'02/19/2014', photo:'http://thetalentcode.com/wp-content/uploads/2607621162_13ece1c44c-1.jpg', isComplete:true, tags:'sleep, relax, snore', priorityID:p3._id.toString()}; 
              t1 = new Task(td1);
              t2 = new Task(td2);
              t3 = new Task(td3);
              t4 = new Task(td4);
              t5 = new Task(td5);
              t6 = new Task(td6);
 console.log(p1);             
              t1.isComplete = true;              

              t1.save(function(){
                t2.save(function(){
                  t3.save(function(){
                    t4.save(function(){
                      t5.save(function(){
                        t6.save(function(){
                          done();                                
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
  
  describe('constructor', function(){
    it('should create a new Task object', function(){
      t1 = new Task({name:'get milk', due:'04/10/2014', photo:'http://www.cdc.gov/foodsafety/images/rawmilk/milk_home.jpg', isComplete:true, tags:'groceries, dairy, liquid', priorityID:p1._id.toString()});

      expect(t1).to.be.instanceof(Task);
      expect(t1.name).to.equal('get milk');
      expect(t1.due).to.equal('04/10/2014');
      expect(t1.photo).to.equal('http://www.cdc.gov/foodsafety/images/rawmilk/milk_home.jpg');
      expect(t1.isComplete).to.be.false;
      expect(t1.tags).to.have.length(24);
      expect(t1.priorityID).to.be.instanceof(Mongo.ObjectID);
    });
  });  
  

  describe('#save', function(){
    it('should insert a task', function(done){
      t1.save(function(){
        expect(t1._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  
  describe('.all', function(){
    it('should get all tasks from database', function(done){
      Task.all(function(tasks){
        console.log(tasks);
        expect(tasks).to.have.length(3);
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

