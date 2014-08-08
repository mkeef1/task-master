/* jshint expr: true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Priority = require('../../app/models/priority');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var p1, p2, p3;

var s1 = {name:'high', color:'red', value:'9'};
var s2 = {name:'medium', color:'yellow', value:'7'};
var s3 = {name:'low', color:'green', value:'5'};

describe('Priority', function(){
  before(function(done){
    dbConnect('Task-master', function(){
      done();
    });
  });

  beforeEach(function(done){
    Priority.collection.remove(function(){
      p1 = new Priority(s1);
      p2 = new Priority(s2);
      p3 = new Priority(s3);
      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            done();
          });
        });
      });
     });
  });

  describe('constructor', function(){
    it('should create a new Priority object', function(){

      expect(p1).to.be.instanceof(Priority);
      expect(p1._id).to.be.instanceof(Mongo.ObjectID);
      expect(p1.name).to.equal('high');
      expect(p1.color).to.equal('red');
      expect(p1.value).to.equal('9');
    });
  });
  
  describe('#save', function(){
    it('should save a priority', function(){
        expect(p1._id).to.be.instanceof(Mongo.ObjectID);
    });
  });
  
  
  describe('.all', function(){
    it('should get all priorities from database', function(done){
      Priority.all(function(priorities){
        console.log(priorities);
        expect(priorities).to.have.length(3);
        expect(priorities[0]).to.be.instanceof(Priority);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a priority by its id', function(done){
      Priority.findById(p1._id.toString(), function(priority){
        expect(p1.name).to.equal('high');
        expect(p1).to.be.instanceof(Priority);
        done();
      });
    });
  });
});
