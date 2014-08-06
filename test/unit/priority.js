/* jshint expr: true */
/* global describe, it, before, beforeEach */

'use strict';

var expect = require('chai').expect;
var Priority = require('../../app/models/priority');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var p1;

describe('Priority', function(){
  before(function(done){
    dbConnect('Task-master', function(){
      done();
    });
  });

  beforeEach(function(done){
    Priority.collection.remove(function(){
      var p = {name:'high', color:'red', value:'10'};
      p1 = new Priority(p);
      p1.insert(function(){
        done();
      });
    });
  });

  describe('#insert', function(){
    it('should insert a priority', function(done){
      p1.insert(function(){
        expect(p1._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  
  describe('constructor', function(){
    it('should create a new Priority object', function(){
      var p = {_id:'123456', name:'high', color:'red', value:'10'};
      var p1 = new Priority(p);

      expect(p1).to.be.instanceof(Priority);
      expect(p1._id).to.equal('123456');
      expect(p1.name).to.equal('high');
      expect(p1.color).to.equal('red');
      expect(p1.value).to.equal('10');
    });
  });
  describe('.all', function(){
    it('should get all priorities from database', function(done){
      Priority.all(function(priorities){
        expect(priorities).to.have.length(1);
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
