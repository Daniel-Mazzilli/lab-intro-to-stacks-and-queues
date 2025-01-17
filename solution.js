const { nums, words } = require("./data/data.js");
const { inspect } = require("util");

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Stack {
  constructor(top = null) {
    this.top = top;
  }
  push(data) {
    const node = new Node(data);
    node.next = this.top;
    this.top = node;
  }
  size() {
    let count = 0;
    let current = this.top;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }
  pop() {
    if (this.top === null) {
      throw new Error("The stack is empty");
    }
    const popItem = this.top;
    this.top = this.top.next;
    return popItem;
  }
  isEmpty() {
    return !this.top;
  }
  findMin() {
    if (this.top === null) {
      throw new Error("The stack is empty");
    }
    const arr = [];
    let current = this.top;
    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    return Math.min(...arr);
  }
  peek() {
    if (this.top !== null) {
      return this.top;
    } else {
      throw new Error("The stack is empty");
    }
  }
  sort() {
    // was stuck on this for a while. Gave in and looked up the method/idea behind doing this. I now undenstand it and coded out a solution

    // create a temp stack for sorting
    let tempStack = new Stack();
    // pop first item of our stack and push it to temp stack
    tempStack.push(this.pop().data);

    // loop while our stack.top is non null value
    while (this.top !== null) {
      // pop top of stack
      const popped = this.pop().data;
      // if popped value is larger than temp stack.top then pop top of temp stack and push it to stack
      if (tempStack.top.data < popped) {
        this.push(tempStack.pop().data);
      }
      // push popped value on temp stack
      tempStack.push(popped);
    }
    // set stack.top to equal tempStack.top
    this.top = tempStack.top;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
    this.max = null;
  }
  enqueue(data) {
    const node = new Node(data);
    if (this.size === 0) {
      this.first = node;
    } else {
      this.last.next = node;
    }
    this.last = node;
    this.size++;
    if (this.max < node.data) {
      this.max = node.data;
    }
  }
  dequeue() {
    if (this.size === 0) {
      throw new Error("The queue is empty");
    }
    const removed = this.first.data;
    this.first = this.first.next;
    this.size--;
    if (removed === this.max) {
      this.max = this.first.data;
      let current = this.first;
      while (current) {
        if (this.max < current.data) {
          this.max = current.data;
        }
        current = current.next;
      }
    }
    return removed;
  }
  count() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
  peek() {
    if (this.size === 0) {
      throw new Error("The queue is empty");
    }
    return this.first;
  }
  getLast() {
    if (this.size === 0) {
      throw new Error("The queue is empty");
    }
    return this.last;
  }
  findMax() {
    if (this.size === 0) {
      throw new Error("The queue is empty");
    }
    return this.max;
  }
}

let numStack2 = new Stack();
for (let num of [2, 3, 1, 4]) {
  numStack2.push(num);
}

console.log(inspect(numStack2, { showHidden: true, colors: true, depth: 12 }));

numStack2.sort();

console.log(inspect(numStack2, { showHidden: true, colors: true, depth: 12 }));

module.exports = {
  Node,
  Queue,
  Stack,
};
