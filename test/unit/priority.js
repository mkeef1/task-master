/* jshint expr: true */
/* global describe, it */

'use strict';

var expect = require('chai').expect;
var Priority = require('../../app/models/priority');

describe('Priority', function(){
  describe('constructor', function(){
    it('should create a new Priority object', function(){
      var p = {_id:'123456', name:'high', color:'red', value:'10'};
      var p1 = new Priority(o);

      expect(p1).to.be.instanceof(Priority);
    });
  });
});
