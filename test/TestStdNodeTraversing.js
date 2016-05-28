var async = require('async')
  , should = require('should')
  , LinkedList = require('../src/LinkedList')
  , stdListItems = [
      {id: 4, username: "agadfg", password: "Test 1", field3: 1234, field4: 10.45},
      {id: 1, username: "ardze5zeh", password: "Test 2", field3: 2345, field4: false},
      {id: 7, username: "Name ohne Ende", password: "Test 3", field3: 3456, field4: true},
      {id: 23, username: "w5zsdghxfdgh", password: "Test 4", field3: 4567, field4: 342345345345345}
    ];

describe('Test traversing functionality', function(done) {

  it('Test standard node functionality (going forward from list start to the end)', function() {
    // Create list with standard nodes.
    var list = LinkedList.Create();

    // Assign values to the list.
    async.eachSeries(
      stdListItems,
      function iterator(node, innerCallback) {
        list.add(node, innerCallback);
      },
      function callback(err) {
        // Check if  there is an error and size of the linked list.
        should.not.exist(err);
        (list.size).should.be.eql(4);

        // Try the first list node to be available and valid.
        var node = list.first();

        should.exist(node);
        (node).should.be.an.Object();
        (node.id).should.be.eql(4);
        (node.field4).should.be.a.Number().and.be.eql(10.45);

        // Go forward the list to the next node.
        node = list.next();
        should.exist(node);
        (node).should.be.an.Object();
        (node.id).should.be.eql(1);
        (node.field4).should.be.a.Boolean().and.be.not.eql(true);

        // Jump directly to the end of the list and check validity of the node.
        node = list.last();
        should.exist(node);
        (node).should.be.an.Object();
        (node.id).should.be.eql(23);

        (list.hasPrevious()).should.be.a.Boolean().and.be.eql(true);
        (list.hasNext()).should.be.a.Boolean().and.be.eql(false);
      });
  });

});