var User = function() {
  this.name = "User";

  this._previous = {data: null};
  this._next = {data: null};
  this._properties = {
      id: {data: null},
      username: {data: null},
      password: {data: null}
    };
};

/**
 *
 * @param id
 * @returns {User}
 */
User.prototype.setId = function(id) {
  this._properties.id.data = (typeof parseInt(id) === 'number') ? parseInt(id): null;
  return this;
};

/**
 *
 * @returns {null|number}
 */
User.prototype.getId = function() {
  return this._properties.id.data;
};

/**
 *
 * @param username
 * @returns {User}
 */
User.prototype.setUsername = function(username) {
  this._properties.username.data = (typeof username === 'string') ? username : null;
  return this;
};

/**
 *
 * @returns {null|string}
 */
User.prototype.getUsername = function() {
  return this._properties.username.data;
};

/**
 *
 * @param password
 * @returns {User}
 */
User.prototype.setPassword = function(password) {
  this._properties.password.data = (typeof password === 'string') ? password : null;
  return this;
};

/**
 *
 * @returns {null|string}
 */
User.prototype.getPassword = function() {
  return this._properties.password.data;
};

/**
 *
 * @returns {User}
 */
User.prototype.reset = function() {
  this._properties = {
    id: {data: null},
    username: {data: null},
    password: {data: null}
  };

  return this;
};
/**
 * Set a specific object to be the previous object in a chain.
 *
 * @param previousNode {User}
 * @returns {User}
 */
User.prototype.setPrevious = function(previousNode) {
  this._previous.data = previousNode;
  return this;
};

/**
 * Get the previous object.
 *
 * @returns {User}
 */
User.prototype.previous = function() {
  return (this.hasPrevious) ? this._previous.data : null;
};

/**
 * Set a specific object to be the next in the chain.
 *
 * @param nextNode {User}
 * @returns {User}
 */
User.prototype.setNext = function(nextNode) {
  this._next.data = nextNode;
  return this;
};

/**
 * Get the next object in the chain.
 *
 * @returns {User}
 */
User.prototype.next = function() {
  return (this.hasNext()) ? this._next.data : null;
};

/**
 *
 * @returns {boolean}
 */
User.prototype.hasNext = function() {
  return (this._next.data !== null);
};

/**
 *
 * @returns {boolean}
 */
User.prototype.hasPrevious = function() {
  return (this._previous.data !== null);
};

/**
 *
 * @returns {User}
 * @constructor
 */
User.Create = function() {
  return new User();
};

module.exports = User;