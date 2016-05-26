var _ = require('underscore')
  , _node = require('./ListNode');

var LinkedList = function(dataClass) {
  this._head = null;
  this._last = null;
  this._iteratorItem = null;
  this._dataType = null;

  this.size = 0;
  this.setDataType(dataClass);
};

/**
 *
 * @param dataType
 * @returns {LinkedList}
 */
LinkedList.prototype.setDataType = function(dataType) {
  if (dataType && typeof dataType === 'function') {
    this._dataType = dataType;
  }

  this._head = this._dataType.Create();
  return this;
};

/**
 *
 * @param data {*}
 * @param callback {function}
 */
LinkedList.prototype.add = function(data, callback) {
  var me = this
    , node = null
    , setNode = true;

  if (me._dataType === _node) {
    node = this._dataType.Create();
    node.setValue(data);
  } else if (data instanceof me._dataType) {
    node = data;
  } else {
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
 *
 * @returns {LinkedList|*}
 */
LinkedList.prototype.node = _node;

/**
 *
 * @param property {string}
 * @param value {*}
 * @returns {object}
 */
LinkedList.prototype.searchBy = function(property, value) {
  if (_.isNull(this._head)) {
    return null;
  } else {
    var currentItem = this._head
      , found = null
      , method = 'get' + property;

    while(currentItem[method]) {
      if ( (typeof currentItem[method] === 'function' && currentItem[method]() == value) || currentItem[method] == value) {
        found = currentItem;
        break;
      }

      currentItem = currentItem.next();
    }
  }
  return found;
};

/**
 *
 * @param position {number}
 * @returns {LinkedList}
 */
LinkedList.prototype.delete = function(position) {
  var node = this.get(position)
    , buffer = node.previous();

  buffer.setNext(node.next());
  node.setPrevious(null).setNext(null);
  return this;
};

/**
 *
 * @param position
 * @returns {null}
 */
LinkedList.prototype.get = function(position) {
  if (_.isNull(this._head) || position < 1) return this._head;
  else {
    if (position > this.size) return this._last;
    
    var currentItem = this._head
		 , iterator = 1;
    for(;iterator <= position; iterator++) currentItem = currentItem.next();
    return currentItem;
  }
};

/**
 *
 * @returns {*}
 */
LinkedList.prototype.first = function() {
  this._iteratorItem = this._head.next();
  return this._iteratorItem;
};

/**
 *
 * @returns {*}
 */
LinkedList.prototype.last = function() {
  this._iteratorItem = this._last;
  return this._iteratorItem;
};

/**
 *
 * @returns {*}
 */
LinkedList.prototype.previous = function() {
  if (this.hasPrevious())
    this._iteratorItem = this._iteratorItem.previous();
  return this._iteratorItem;
};

/**
 *
 * @returns {*}
 */
LinkedList.prototype.next = function() {
  if (this.hasNext())
    this._iteratorItem = this._iteratorItem.next();
  return this._iteratorItem;
};

/**
 *
 */
LinkedList.prototype.hasNext = function() {
  return this._iteratorItem.hasNext();
};

/**
 *
 */
LinkedList.prototype.hasPrevious = function() {
  return this._iteratorItem.hasPrevious();
};

/**
 *
 * @returns {boolean}
 */
LinkedList.prototype.clean = function() {
  return true;
};

/**
 *
 * @returns {Array}
 */
LinkedList.prototype.toArray = function() {
  return []
};

/**
 *
 * @param classConstructor
 * @returns {LinkedList}
 * @constructor
 */
LinkedList.Create = function(classConstructor) {
  if (_.isNull(classConstructor) || _.isUndefined(classConstructor) || typeof classConstructor !== 'function')
    classConstructor = _node;

  return new LinkedList(classConstructor);
};

module.exports = LinkedList;
