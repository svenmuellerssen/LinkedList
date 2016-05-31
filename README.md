<h1>LinkedList</h1>

An implementation of the concept of double linked lists.

<h2>Documentation</h2>

<h3>How to use</h3>

Quick example to get an instance of the linked list:
```javascript
  var LinkedList = require('node-linkedlist')
    , User = require('../Object/User')
    , list = LinkedList.Create(User);
     
    ... 
  var user = User.Create();
  list.add(user, function(err, listObj) {
    ... 
    ... 
  });
```

<h3>Linked list</h3>

<a name="size">
<h4>size</h4>

The number of nodes linked to each other in a row.

<strong>Example</strong>

```javascript
var list = require("node-linkedlist").Create()
...
  console.log(list.size);
```

<a name="setDataType">
<h4>setDataType(dataType)</h4>

You are not fixed to use ''LinkedList'' as it is with the internal standard node. You can use it to chain
your own business objects too. The only thing you have to do is to extend the standard node object and publish
the constructor of you class to the ''LinkedList'' instance.
To publish your own node class without inherit from the standard node you only have to implement the methods that are described at the
bottom of the documentation under <a href="#node">List node</a>
<br/>
<br/>
<strong>Arguments</strong>

* `dataType` (constructor) - The constructor of the class extending the standard node object.
* `return` (LinkedList) - The list itself is returned.

<strong>Example</strong>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create()
  , User = require('<path>/User');

  list.setDataType(User);
```

Alternatively you can publish the constructor directly on create the ''LinkedList'' instance.

```javascript
var LinkedList = require("node-linkedlist")
  , User = require('<path>/User')
  , list = LinkedList.Create(User);

  ...
  ...
```
It is important to know that if you publish a constructor to the ''LinkedList'' instance after adding nodes all of them are lost because
publishing requires to set a new first node of the published constructor. It is planned to realize a mixed-mode of nodes which have
implemented a standard interface.

<a name="add">
<h4>add(data[, callback])</h4>

Add a new node to the end of the list.
<br/>
<br/>
<b>Arguments</b>

* `data` (string) - The data to add to the list. It can be a node object too.
* `callback` (function) - The callback function with parameter `err` and `listObj`.
* `return` (listObj) - The `LinkedList` instance itself.

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create()
  , node = list.node;

  ...
  list.add('FirstName', function(err, listObj) {
    if (err) console.log(err);
    else {
      console.log(listObj.size);
    }
  });
```

<a name="searchBy">
<h4>searchBy(property, value)</h4>

Search a node by one of its properties. If the list contains extended standard nodes it is required to implement
a getter method like ''getFirstName'' or ''getFirstname''.
<br/>
<br/>
<b>Arguments</b>

* `property` (string) - The nodes property to search in the value.
* `value` (*) - The value to search in the given property.
* `return` (node) - The node you searched or null if it can't be found.

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , User = require('<path>/User')
  , list = LinkedList.Create(User);

  ...
  list.searchBy('FirstName', "Warden");
```

<a name="get">
<h4>get(position[, raw])</h4>

Get a node by a given position.
<br/>
<br/>
<b>Arguments</b>

* `position` (number) - The position of the node that is wanted. If the position less equal '0' or higher than the list size
                        the first or last node is returned.
* `raw` (boolean) - A flag to get the node itself instead of the value only. Default is false to get only the value.
* `return` (Node) - The node at the position or first/last node if the position is less/equal 0 or higher than list size.

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create();

  ...
  var node = list.get(54, true);
```

<a name="delete">
<h4>delete(position)</h4>

Delete a node from given position.
<br/>
<br/>
<b>Arguments</b>

* `position` (number) - The position of the node which has to be removed.
* `return` (LinkedList) - The list itself is returned.

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create();

  ...
  list.delete(54, true);
```

<a name="first">
<h4>first()</h4>

Get the first node of the list.
<br/>
<br/>
<b>Arguments</b>

* `return` (node) - The first node in the list.

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create();

  ...
  var firstNode = list.first();
```

<a name="last">
<h4>last()</h4>

Get the last node of the list.
<br/>
<br/>
<b>Arguments</b>

* `return` (node) - The last node in the list.

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create();

  ...
  var firstNode = list.last();
```

<a name="isStdNode">
<h4>isStdNode(node)</h4>

Check if a node is an instance of the internal standard node.
<br/>
<br/>
<b>Arguments</b>

* `node` (object) - The node that will be compared with the constructor of the standard node.
* `return` (boolean) - True if the given node is a standard node. Otherwise false is returned.

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create();

  ...
  var node = ...;
  if (list.isStdNode(node)) {
    ...
    ...
  }
```

<a name="clean">
<h4>clean()</h4>

Removes all nodes from the list.
<br/>
<br/>
<b>Arguments</b>

* `return` (LinkedList) - The list itself is returned.

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create();

  ...
  list.clean();
```

<a name="toArray">
<h4>toArray()</h4>

Converts the list into an array.
<br/>
<br/>
<b>Arguments</b>

* `return` (Array) - All nodes in an array.

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create();

  ...
  var nodes = list.toArray();
  ...
```

<h3>Iteration over the list</h3>
To reduce source code and do not lost performance it is recommended to iterate over the list itself
instead of use ''toArray'' and loop over this.
The ''LinkedList'' has the standard methods implemented you expect from an iterator.

<a name="next">
<h4>next()</h4>

Get the next node in the list.


<a name="hasNext">
<h4>hasNext()</h4>

Check the existence of a next node.


<a name="previous">
<h4>previous()</h4>

Get the previous node in the list.


<a name="hasPrevious">
<h4>hasPrevious()</h4>

Check the existence of a previous node.

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create()
 ,  node = null;
  // Traversing forwards 
  for(node = list.first(); list.hasNext(); node = list.next()) {
   ... 
   ... 
  }
  
  // or backwards
  for(node = list.last(); list.hasPrevious(); node.previous()) {
   ... 
   ... 
  }
```

<h3>List node</h3>
<a name="node">
<h4>node [Constructor]</h4>

The list node is the standard node object used by the linked list internally if no other node constructor is offered.
You can get it via the property 'node' of the linked list object.
<br/>
<br/>
<b>Arguments</b>

* No arguments

<b>Example</b>

```javascript
var list = require("node-linkedlist").Create()
  , node = list.node;

var newNode = node.Create();
```

<a name="setNext">
<h4>setNext(nextNode)</h4>

Set another node object as next node to the current one.
<br/>
<br/>
<b>Arguments</b>

* nextNode (object) - A node which has to be referenced as next node.

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create();
... 
var last = list.last()
  , node = list.node.Create();

node.setValue({
  field1: true, 
  field2: 123, 
  field3: {success: true}, 
  field4: "Everything's fine."
});
  
last.setNext(node);
...
```

<a name="next">
<h4>next()</h4>

Get the next node that is referenced to the current node.
<br/>
<br/>
<b>Arguments</b>

* No argument

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create();
... 
var node = list.first()
...
node = node.next();
...
```

<a name="hasNext">
<h4>hasNext()</h4>

Check the existence of a next nodes reference.
<br/>
<br/>
<b>Arguments</b>

* No argument

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create();
... 
var node = list.first()
...
if (node.hasNext())
  node = node.next();
...
```

<a name="setPrevious">
<h4>setPrevious(previousNode)</h4>

Set another node object as previous node to the current one.
<br/>
<br/>
<b>Arguments</b>

* previousNode (node) - The node which has to be referenced before current node.

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create()
  , node = list.node;
...
var last = node.Create()
  , newNode = node.Create();

last.setValue({
  field1: true, 
  field2: 123, 
  field3: {success: true}, 
  field4: "Everything's fine."
});

newNode.setValue("Only a small text string...");
last.setPrevious(newNode);
...
```

<a name="previous">
<h4>previous()</h4>

Get the previous node that is referenced to the current node.
<br/>
<br/>
<b>Arguments</b>

* No argument

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create();
... 
var node = list.last()
...
node = node.previous();
...
```

<a name="hasPrevious">
<h4>hasPrevious()</h4>

Check the existence of a previous nodes reference.
<br/>
<br/>
<b>Arguments</b>

* No argument

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create();
... 
var node = list.last()
...
if (node.hasPrevious())
  node = node.previous();
...
```

<a name="setValue">
<h4>setValue(value)</h4>

Set the value that has to be added to the list. This method is used internally so it is fully transparent
via ''list.add(...)'' if you use the standard node.
<br/>
<br/>
<b>Arguments</b>

* value (mixed) - The value that has to be put to a list via a node.

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create()
  , Node = list.node;
... 
var node = list.last()
...
var newNode = Node.Create();
newNode.setValue({message: 'Created new node.'});
node.setNext(newNode);
...
```

<a name="getValue">
<h4>getValue()</h4>

Get the value that is stored in a node. This method is used internally so it is fully transparent
via ''list.get(position)'' if you use the standard node.
<br/>
<br/>
<b>Arguments</b>

* No argument

<b>Example</b>

```javascript
var LinkedList = require("node-linkedlist")
  , list = LinkedList.Create()
  , Node = list.node;
... 
var node = list.last()
console.log(node.getValue());
...