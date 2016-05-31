var ring = require('ring');

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
 * @param previousNode {User}
 * @returns {User}
 */
User2.prototype.setPrevious = function(previousNode) {
  this._previous.data = previousNode;
  return this;
};

/**
 * Get the previous object.
 *
 * @returns {User}
 */
User2.prototype.previous = function() {
  return (this.hasPrevious) ? this._previous.data : null;
};

/**
 * Set a specific object to be the next in the chain.
 *
 * @param nextNode {User}
 * @returns {User}
 */
User2.prototype.setNext = function(nextNode) {
  this._next.data = nextNode;
  return this;
};

/**
 * Get the next object in the chain.
 *
 * @returns {User}
 */
User2.prototype.next = function() {
  return (this.hasNext()) ? this._next.data : null;
};

/**
 *
 * @returns {boolean}
 */
User2.prototype.hasNext = function() {
  return (this._next.data !== null);
};

/**
 *
 * @returns {boolean}
 */
User2.prototype.hasPrevious = function() {
  return (this._previous.data !== null);
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