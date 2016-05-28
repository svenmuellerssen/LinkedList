var async = require('async')
  , should = require('should')
  , LinkedList = require('../src/LinkedList')
  , stdListItems = [
      {id: 4, username: "agadfg", password: "Test 1", field3: 1234, field4: 10.45},
      {id: 1, username: "ardze5zeh", password: "Test 2", field3: 2345, field4: false},
      {id: 7, username: "Name ohne Ende", password: "Test 3", field3: 3456, field4: true},
      {id: 23, username: "w5zsdghxfdgh", password: "Test 4", field3: 4567, field4: 342345345345345}
    ];

describe('Test get linked list node as array', function(done) {

  it('Test to get all nodes into an array', function() {
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
        var nodes = list.toArray();
        (nodes).should.be.lengthOf(4);

        var node = nodes[0];
        should(node).be.not.null();
        (node.id).should.be.eql(4);

        node = nodes[nodes.length -1];
        should(node).be.not.null();
        (node.id).should.be.eql(23);
      });
  });
});