var ring = require('ring')
  , _ = require('underscore');

var User2 = function() {
  this.name = "User";

  this._previous = {data: null};
  this._next = {data: null};

  this.id = null;
  this.username = null;
  this.password = null;
};

/**
 * Set a specific object to be the previous object in a chain.
 *
 * @param previousNode {ListNode}
 * @returns {ListNode}
 */
User2.prototype.setPrevious = function(previousNode) {
  this._previous.data = previousNode;
  return this;
};

/**
 * Get the previous object.
 *
 * @returns {ListNode}
 */
User2.prototype.previous = function() {
  return (this.hasPrevious) ? this._previous.data : null;
};

/**
 * Set a specific object to be the next in the chain.
 *
 * @param nextNode {ListNode}
 * @returns {ListNode}
 */
User2.prototype.setNext = function(nextNode) {
  this._next.data = nextNode;
  return this;
};

/**
 * Get the next object in the chain.
 *
 * @returns {ListNode}
 */
User2.prototype.next = function() {
  return (this.hasNext()) ? this._next.data : null;
};

/**
 *
 * @returns {boolean}
 */
User2.prototype.hasNext = function() {
  return (!_.isNull(this._next.data) === true);
};

/**
 *
 * @returns {boolean}
 */
User2.prototype.hasPrevious = function() {
  return (_.isNull(this._previous.data) === false);
};

/**
 *
 * @returns {User}
 * @constructor
 */
User2.Create = function() {
  return new User();
};

module.exports = User2;