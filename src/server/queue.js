function Queue() {
  this.queue = [];
}

Queue.prototype.enqueue = function enqueue(item) {
  this.queue.push(item);
};

Queue.prototype.dequeue = function dequeue() {
  this.queue.shift();
};

module.exports = Queue;
