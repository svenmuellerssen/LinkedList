var async = require('async')
  , should = require('should')
  , LinkedList = require('../src/LinkedList')
  , stdListItems = [
      {id: 4, username: "agadfg", password: "Test 1", field3: 1234, field4: 10.45},
      {id: 1, username: "ardze5zeh", password: "Test 2", field3: 2345, field4: false},
      {id: 7, username: "Name ohne Ende", password: "Test 3", field3: 3456, field4: true},
      {id: 23, username: "w5zsdghxfdgh", password: "Test 4", field3: 4567, field4: 342345345345345}
    ];

describe('Test adding single node object to the list', function(done) {
  it('Test create single node and add it', function() {
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

        // Create a new standard node object.
        var node = list.node.Create();

        // Set new node value.
        node.setValue({
          field1: true,
          field2: 123,
          field3: {success: true},
          field4: "Everything's fine."
        });

        // Add the new node to the list.
        list.add(node, function(err, listObj) {
          // Check if  there is an error and size of the linked list.
          should.not.exist(err);
          (listObj.size).should.be.eql(5);

          node = listObj.last();
          should(node).be.not.null();
          (node).should.have.property('field1');
          should(node.field1).be.a.Boolean().and.be.equal(true);

          (node).should.have.property('field2');
          should(node.field2).be.a.Number().and.be.equal(123);

          (node).should.have.property('field3');
          should(node.field3).be.an.Object().and.be.eql({success: true});

          (node).should.have.property('field4');
          should(node.field4).be.a.String().and.be.equal("Everything's fine.");
        });
      });
  });
});