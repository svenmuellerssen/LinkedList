var async = require('async')
  , should = require('should')
  , LinkedList = require('../src/LinkedList')
  , stdListItems = [
      {id: 4, username: "agadfg", password: "Test 1", field3: 1234, field4: 10.45},
      {id: 1, username: "ardze5zeh", password: "Test 2", field3: 2345, field4: false},
      {id: 7, username: "Name ohne Ende", password: "Test 3", field3: 3456, field4: true},
      {id: 23, username: "w5zsdghxfdgh", password: "Test 4", field3: 4567, field4: 342345345345345}
    ]
  , User = require('./User')
  , user = User.Create()
  ;

describe('Test backward traversing functionality', function(done) {

  it('Test standard node functionality (going backwards from the list end to the beginning)', function() {
    // Create list with custom nodes.
    var list = LinkedList.Create();
    list.setDataType(User);

    // Assign values to the custom node and push to the list.
    async.each(
      stdListItems,
      function iterator(node, innerCallback) {
        var user = User.Create();
        user
          .setId(node.id)
          .setUsername(node.username)
          .setPassword(node.password);
        list.add(user, innerCallback);
      },
      function callback(err) {
        // Check if  there is an error and size of the linked list.
        should.not.exist(err);
        (list.size).should.be.eql(4);

        // Jump directly to the end of the list and check validity of the node.
        var node = list.last();
        should.exist(node);
        (node).should.be.instanceof(User);
        (node.getId()).should.be.a.Number().and.be.eql(23);
        (node.getUsername()).should.be.a.String().and.be.eql('w5zsdghxfdgh');
        (node.getPassword()).should.be.a.String().and.be.eql('Test 4');

        // Go 2 nodes backwards in the list and check.
        node = node.previous().previous();
        should.exist(node);
        (node).should.be.instanceof(User);
        (node.getId()).should.be.a.Number().and.be.eql(1);
        (node.getUsername()).should.be.a.String().and.be.eql('ardze5zeh');
        (node.getPassword()).should.be.a.String().and.be.eql('Test 2');

        // The  last node in the line is the first node of the list.
        node = node.previous();
        should.exist(node);
        (node).should.be.instanceof(User);
        (node.getId()).should.be.a.Number().and.be.eql(4);
        (node.getUsername()).should.be.a.String().and.be.eql('agadfg');
        (node.getPassword()).should.be.a.String().and.be.eql('Test 1');

        (node.hasPrevious()).should.be.a.Boolean().and.be.eql(false);
        (node.hasNext()).should.be.a.Boolean().and.be.eql(true);
      });
  });
});