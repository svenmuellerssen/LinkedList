var _node = require('./ListNode')
  , ring = require('ring');

/**
 *
 * @param {function} dataClass
 * @constructor
 */
var LinkedList = function(dataClass) {
  this._head = null;
  this._last = null;
  this._iteratorItem = null;
  this._dataType = null;
  this._foundPosition = 0;
  this.size = 0;

  this.setDataType(dataClass);
};

/**
 * The constructor of the standard node.
 *
 * @returns {LinkedList|*}
 */
LinkedList.prototype.node = _node;

/**
 * Set the class constructor to be used in this list instance.
 *
 * @param {function} dataType
 * @returns {LinkedList}
 */
LinkedList.prototype.setDataType = function(dataType) {
  if (dataType && typeof dataType === 'function') {
    this._dataType = dataType;
  }

  this._head = _node.instance();
  return this;
};

/**
 *
 * @param {array} list
 * @param {function} callback
 * @returns {LinkedList}
 */
LinkedList.prototype.setItems = function(list, callback) {
  list = list || null;
  var me = this;
  if(!Array.isArray(list)) {
    callback({message: 'Error: This format is not supported yet. Array is currently the only type.', code: 0}, null);
    return this;
  } else if (list.length == 0) {
    callback(null, me);
    return me;
  } else {
    list.forEach(function(node) {
      me.add(node, function() {});
    });

    callback(null, me);
    return me;
  }
};
/**
 * Add new list node.
 *
 * @param {null|*} data
 * @param {function} callback
 * @return {LinkedList}
 */
LinkedList.prototype.add = function(data, callback) {

  callback = callback || function(err, result) {};
  var me = this
    , node = null
    , setNode = true;

  if (ring.instance(data, me._dataType)) {
    node = data;
  } else if (me._dataType === _node) {
    node = this._dataType.instance();
    node.setValue(data);
  }  else {
    setNode = false;
  }

  if (setNode === false) {
    callback({message: 'Given node is not the same data type than the list type needs.', code: 0}, null);
    return false;
  } else {
    if (me.size === 0) {
      me._head.setNext(node);
      me._last = node;
    } else {
      node.setPrevious(me._last);
      me._last.setNext(node);
      me._last = node;
    }

    me.size++;
    callback(null, me);
    return me;
  }
};

/**
 * Search a list node by a node property.
 * This can be a normal property or a method name.
 *
 * @param {string} property
 * @param {*} value
 * @returns {object}
 */
LinkedList.prototype.searchBy = function(property, value) {
  if (this._head.next() === null) {
    return null;
  } else {
    var me = this
      , currentItem = this._head.next()
      , found = null;

    me._foundPosition = 0;

    /**
     * Search a node by its property.
     */
    var searchPropertyOfStandardNode = function() {
      var nodeValue = currentItem.getValue()
        , typeOfValue = (nodeValue[property]) ? typeof nodeValue[property] : null;

      if (typeOfValue !== null)
        switch(typeOfValue) {
          case 'number':
          case 'string':
          case 'boolean':
            while(currentItem !== null && currentItem.getValue()[property]) {
              if (currentItem.getValue()[property] === value) {
                found = currentItem;
                break;
              }
              currentItem = currentItem.next();
              me._foundPosition++;
            }
            break;
          case 'function':
            while(currentItem !== null && currentItem.getValue()[property]) {
              if (currentItem.getValue()[property]() === value) {
                found = currentItem;
                break;
              }
              currentItem = currentItem.next();
              me._foundPosition++;
            }
            break;
        }
    };

    /**
     * Search of a custom node.
     */
    var searchPropertyOfCustomNode = function() {
      var method = 'get' + property.charAt(0).toUpperCase() + property.slice(1);

      while(currentItem && currentItem[method]) {
        if ( (typeof currentItem[method] === 'function' && (currentItem[method]() == value) || currentItem[method] == value)) {
          found = currentItem;
          break;
        }
        currentItem = currentItem.next();
        me._foundPosition++;
      }
    };

    // Search differently depending on node class.
    if (ring.instance(currentItem,_node) === true) searchPropertyOfStandardNode();
    else searchPropertyOfCustomNode();

    // Set the found node to current iterator item;
    if (found !== null) this._iteratorItem = found;

    if (this.isStdNode(found))
      return found.getValue();
    else
      return found;
  }
};

/**
 * Get a node from a given position in the list.
 *
 * @param {number} position
 * @param {boolean} raw
 * @returns {null|*}
 */
LinkedList.prototype.get = function(position, raw) {
  raw = (raw === true);
  var currentItem = null;

  if (this._head.next() === null || position <= 1) currentItem = this._head.next();
  else if (position >= this.size) currentItem = this._last;
  else {
    var iterator = 0;
    currentItem = this._head.next();
    for(;iterator < position; iterator++) currentItem = currentItem.next();
  }

  if (!this.isStdNode(currentItem) || (this.isStdNode(currentItem) && raw)) return currentItem;
  else return currentItem.getValue();
};

/**
 * Remove a node by its position in the list.
 *
 * @param {number} position
 * @returns {LinkedList}
 */
LinkedList.prototype.delete = function(position) {
  var node = this.get(position, true);
  // Node is the first item in the list
  if (node.previous() === null) {
    // Node was the only one in the list.
    if (node.next() === null) {
      this._head.setNext(null);
      node = null;
    } else {
      // Node has a following item.
      var next = node.next();
      this._head.setNext(next);
      next.setPrevious(this._head);
      node = null;
      if (position === this.size) this._last = next;
    }
  } else {
    // Remove node from given position.
    var buffer = node.previous();
    buffer.setNext(node.next());
    node.setPrevious(null).setNext(null);
    if (position === this.size) this._last = buffer;
  }

  this.size--;
  return this;
};

/**
 * Get the position from last found node.
 * On searching a node the position where it was found is stored and
 * can be given back.
 *
 * @returns {number}
 */
LinkedList.prototype.getPosition = function() {
  return this._foundPosition;
};

/**
 * Get the first node in the list.
 *
 * @returns {*}
 */
LinkedList.prototype.first = function() {
  this._iteratorItem = this._head.next();
  if (this.isStdNode(this._iteratorItem))
    return this._iteratorItem.getValue();
  else
    return this._iteratorItem;
};

/**
 * Get the last node in the list.
 *
 * @returns {*}
 */
LinkedList.prototype.last = function() {
  this._iteratorItem = this._last;
  if (this.isStdNode(this._iteratorItem))
    return this._iteratorItem.getValue();
  else
    return this._iteratorItem;
};

/**
 * Get the previous node (when iterating).
 * @returns {*}
 */
LinkedList.prototype.previous = function() {
  if (!this.hasPrevious()) return null;
  else {
    this._iteratorItem = this._iteratorItem.previous();
    if (this.isStdNode(this._iteratorItem))
      return this._iteratorItem.getValue();
    else
      return this._iteratorItem;
  }
};

/**
 * Get the next node (when iterating)
 *
 * @returns {*}
 */
LinkedList.prototype.next = function() {
  if (!this.hasNext()) return null;
  else {
    this._iteratorItem = this._iteratorItem.next();
    if (this.isStdNode(this._iteratorItem))
      return this._iteratorItem.getValue();
    else
      return this._iteratorItem;
  }
};

/**
 * Check of the next node.
 * @returns {boolean}
 */
LinkedList.prototype.hasNext = function() {
  if (this._iteratorItem !== null) return this._iteratorItem.hasNext();
  else if (this._head.next() !== null) {
    this._iteratorItem = this._head.next();
    return this._iteratorItem.hasNext();
  } else return false;
};

/**
 * Check of the previous node.
 *
 * @returns {boolean}
 */
LinkedList.prototype.hasPrevious = function() {
  if (this._iteratorItem !== null) return this._iteratorItem.hasPrevious();
  else if(this._last !== null) {
    this._iteratorItem = this._last;
    this._iteratorItem.hasPrevious();
  } else  return false;
};

/**
 *
 * @param node
 * @returns {boolean}
 */
LinkedList.prototype.isStdNode = function(node) {
  return ring.instance(node, _node);
};

/**
 * Remove all nodes from list.
 * @returns {LinkedList}
 */
LinkedList.prototype.clean = function() {
  var node = this._last;

  while(node !== null) {
    if (node.hasPrevious() === true) node = node.previous();
    else node = null;
  }

  this._head.setNext(null);
  this._last = null;
  this.size = 0;
  return this;
};

/**
 * Get all nodes in an array.
 * @returns {Array}
 */
LinkedList.prototype.toArray = function() {
  var list = [];

  if (this.size > 0) {
    var count = 1;
    for(; count <= this.size; count++) {
      //console.log(this.get(count, false));
      list.push(this.get(count, false));
    }
  }

  return list;
};

/**
 * Create a new instance of the list.
 * @param {function} classConstructor
 * @returns {LinkedList}
 */
LinkedList.Create = function(classConstructor) {
  if (classConstructor === null || classConstructor === void 0 || typeof classConstructor !== 'function')
    classConstructor = _node;

  return new LinkedList(classConstructor);
};

module.exports = LinkedList;
