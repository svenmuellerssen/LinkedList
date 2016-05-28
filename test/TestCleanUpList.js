var async = require('async')
  , should = require('should')
  , LinkedList = require('../src/LinkedList')
  , stdListItems = [
      {id: 4, username: "agadfg", password: "Test 1", field3: 1234, field4: 10.45},
      {id: 1, username: "ardze5zeh", password: "Test 2", field3: 2345, field4: false},
      {id: 7, username: "Name ohne Ende", password: "Test 3", field3: 3456, field4: true},
      {id: 23, username: "w5zsdghxfdgh", password: "Test 4", field3: 4567, field4: 342345345345345}
    ];

describe('Test clean list from nodes functionality', function(done) {

  it('Test removing all nodes from collection', function() {
    // Create list with custom nodes.
    var list = LinkedList.Create();

    // Assign values to the custom node and push to the list.
    async.each(
      stdListItems,
      function iterator(node, innerCallback) {

        list.add(node, innerCallback);
      },
      function callback(err) {
        // Check if  there is an error and size of the linked list.
        should.not.exist(err);
        (list.size).should.be.eql(4);

        // Jump directly to the end of the list and check validity of the node.
        list.clean();
        (list.size).should.be.eql(0);

        var node = list.last();
        should(node).be.null();

        node = list.first();
        should(node).be.null();

        node = list.get(3);
        should(node).be.null();
      });
  });
});