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
  , user = User.instance();

describe('Test search functionality', function(done) {

  it('Test the search a standard node by a property functionality', function() {
    // Create list with standard nodes.
    var list = LinkedList.Create(User);

    // Assign values to the list.
    async.eachSeries(
      stdListItems,
      function iterator(node, innerCallback) {
        var user = User.instance();
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

        // Try the first list node to be available and valid.
        var node = list.searchBy('id', 7);

        should.exist(node);
        (node).should.be.instanceof(User);
        (node.getId()).should.be.a.Number().and.be.eql(7);
        (node.getUsername()).should.be.a.String().and.be.eql('Name ohne Ende');
        (node.getPassword()).should.be.a.String().and.be.eql('Test 3');

        // Go forward the list to the next node.
        node = node.next();
        should.exist(node);
        (node).should.be.instanceof(User);
        (node.getId()).should.be.a.Number().and.be.eql(23);
        (node.getUsername()).should.be.a.String().and.be.eql('w5zsdghxfdgh');
        (node.getPassword()).should.be.a.String().and.be.eql('Test 4');

        (node.hasPrevious()).should.be.a.Boolean().and.be.eql(true);
        (node.hasNext()).should.be.a.Boolean().and.be.eql(false);
        // Jump directly to the end of the list and check validity of the node.
        node = list.last();
        should.exist(node);
        (node).should.be.instanceof(User);
        (node.getId()).should.be.a.Number().and.be.eql(23);
        (node.getUsername()).should.be.a.String().and.be.eql('w5zsdghxfdgh');
        (node.getPassword()).should.be.a.String().and.be.eql('Test 4');


      });
  });
});