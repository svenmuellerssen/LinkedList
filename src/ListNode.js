var _ = require('underscore');

var ListNode = function() {
  this.name = "ListNode";
  this._value = {data: null};
  this._previous = {data: null};
  this._next = {data: null};
};

/**
 *
 * @param value
 */
ListNode.prototype.setValue = function(value) {
  this._value.data = value;
};

/**
 *
 * @returns {null}
 */
ListNode.prototype.getValue = function() {
  return this._value.data;
};
  /**
   * Set a specific object to be the previous object in a chain.
   *
   * @param previousNode {ListNode}
   * @returns {ListNode}
   */
ListNode.prototype.setPrevious = function(previousNode) {
  this._previous.data = previousNode;
  return this;
};

  /**
   * Get the previous object.
   *
   * @returns {ListNode}
   */
ListNode.prototype.previous = function() {
  return this._previous.data;
};

  /**
   * Set a specific object to be the next in the chain.
   *
   * @param nextNode {ListNode}
   * @returns {ListNode}
   */
ListNode.prototype.setNext = function(nextNode) {
  this._next.data = nextNode;
  return this;
};

  /**
   * Get the next object in the chain.
   *
   * @returns {ListNode}
   */
ListNode.prototype.next = function() {
  return this._next.data;
};


/**
 *
 * @returns {boolean}
 */
ListNode.prototype.hasPrevious = function() {
  return (_.isNull(this._previous.data) === false);
};


/**
 *
 * @returns {boolean}
 */
ListNode.prototype.hasNext = function() {
  return (!_.isNull(this._next.data) === true);
};

ListNode.Create = function() {
  return new ListNode();
};

module.exports = ListNode;