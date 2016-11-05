var ListNode = function() {
  this.name = "ListNode";
  this._value = {data: null};
  this._previous = {data: null};
  this._next = {data: null};
};

/**
 * Set the node value.
 *
 * @param value
 */
ListNode.prototype.setValue = function(value) {
  this._value.data = value;
};

/**
 * Get the node value.
 *
 * @returns {null|*}
 */
ListNode.prototype.getValue = function() {
  return this._value.data;
};

/**
 * Set a node object to be the previous object of the current one.
 *
 * @param {ListNode} previousNode
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
   * Set a node object to be the next in the list.
   *
   * @param {ListNode} nextNode
   * @returns {ListNode}
   */
ListNode.prototype.setNext = function(nextNode) {
  this._next.data = nextNode;
  return this;
};

  /**
   * Get the next object in the list.
   *
   * @returns {ListNode}
   */
ListNode.prototype.next = function() {
  return this._next.data;
};


/**
 * Check if the current node has a previous one.
 *
 * @returns {boolean}
 */
ListNode.prototype.hasPrevious = function() {
  return (this._previous.data !== null);
};


/**
 * Check if the current node has a next one.
 * @returns {boolean}
 */
ListNode.prototype.hasNext = function() {
  return (this._next.data !== null);
};

/**
 * Create a new node instance.
 *
 * @returns {ListNode}
 */
ListNode.instance = function() {
  return new ListNode();
};

module.exports = ListNode;