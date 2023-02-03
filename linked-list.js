/** Node: node for a singly linked list. */

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

/** LinkedList: chained together nodes. */

class LinkedList {
	constructor(vals = []) {
		this.head = null;
		this.tail = null;
		this.length = 0;

		for (let val of vals) this.push(val);
	}

	/** push(val): add new value to end of list. */
  _get(idx) {
    let cur = this.head;
    let count = 0;

    while (cur !== null && count != idx) {
      count += 1;
      cur = cur.next;
    }

    return cur;
  }
	BApush(val) {
		// make new node
		let newNode = new Node(val);
		if (this.length > 0) {
			//connect to next which is tail
			this.tail.next = newNode;
			//set tail to new node with the value in it
			this.tail = newNode;
		} else {
			//when zero, the new value will be both head and tail
			this.head = newNode;
			this.tail = newNode;
		}
		this.length += 1;
		return newNode;
	}
  push(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length += 1;
  }


	/** unshift(val): add new value to start of list. */

	BAunshift(val) {
		let newNode = new Node(val);
		if (this.length > 0) {
			//the head is replaced by new value so get old value to next
			newNode.next = this.head;

			//set head to new node with the value in it
			this.head = newNode;
		} else {
			//when zero, the new value will be both head and tail
			this.head = newNode;
			this.tail = newNode;
		}
		this.length += 1;
		return newNode;
	}
  unshift(val) {
    let newNode = new Node(val);

    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    if (this.length === 0) this.tail = this.head;

    this.length += 1;
  }

	/** pop(): return & remove last item. */

	BApop() {
		if (this.length > 0) {
			//always the head is the first value so its current node
			let currentNode = this.head;
			let secondToLast = this.head;
			// while the current node is not the tail or has a next node set secondToLast to currentNode. thn line 69 will currentNode to the next value found after currentNode.
			while (currentNode.next) {
				secondToLast = currentNode;
				currentNode = currentNode.next;
			}
			// when secondToLast doesn't have a next value, then set next to null and secondToLast will become the tail
			secondToLast.next = null;
			this.tail = secondToLast;
			// since node are getting popped subtract from lenght
			this.length -= 1;
			// if you keep on subtracting a reach 0 then the Linked list will be empty

			if (!this.length) {
				this.head = null;
				this.tail = null;
			}
		} else {
			// if there is no value to began with just return null
			return null;
		}
	}

  pop() {
    return this.removeAt(this.length - 1);
  }

	/** shift(): return & remove first item. */

	BAshift() {
		//first value is always current
		let currentNode = this.head;
		let nodeToRemove = this.head;
		//make the head the next value while nodetoremove is the first head which is removed and returned
		this.head = currentNode.next;
		this.length -= 1;

		if (!this.length) {
			this.tail = null;
			this.head = null;
		}

		return nodeToRemove.val;
	}
  shift() {
    return this.removeAt(0);
  }

	/** getAt(idx): get val at idx. */

	BAgetAt(idx) {
		let current = this.head;
		if (idx < 0 || idx >= this.length) {
			return null;
		}

		while (current !== null) {
			if (current.idx === idx) return current;

			current = current.next;
		}
	}

  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    return this._get(idx).val;
  }

	/** setAt(idx, val): set val at idx to val */

	BAsetAt(idx, val) {
		// first get the val from index
		const currentNode = this.get(idx);
		// if the node does exist
		if (currentNode) {
			// set its value to the val give to us
			currentNode.val = val;
			// and return it
			return currentNode;
		} else {
			// if the node does not exist, return null
			return null;
		}
	}

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    let cur = this._get(idx);
    cur.val = val;
  }

	/** insertAt(idx, val): add node w/val before idx. */

	BAinsertAt(idx, val) {
		// if index is less that zero or greater that the lenght then it don't work.
		if (idx < 0 || idx > this.length) {
			return null;
		} else if (idx === 0) {
			// add a node to the beginning of the List
			return this.unshift(val);
		} else if (idx === this.length) {
			// if it is the last index then add a node to the end of the List
			return this.push(val);
		} else {
			// get the node before the new node's desired place (because it has to point to the new node soon)
			//lst.insertAt(1, 3); at index 1 insert 3
			//example [1,2,3] idx = [0,1,2]
			//preDesiredPlace = 0
			const preDesiredPlace = this.getAt(idx - 1);
			// create a new node
			const newNode = new Node(val);
			// the new node should point to the node, that is currently at the new node's desired place
			// newNode head:3 tail:3
			//newNode.next = preDesiredPlace.next= @ idx0.next
			newNode.next = preDesiredPlace.next;
			// the node before the new node's desired place should point to the new node
			//preDesiredPlace.next is idx 1
			preDesiredPlace.next = newNode;
			// increase the List's length by 1
			this.length += 1;
			// return the new node
			return newNode;
		}
	}
  insertAt(idx, val) {
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    // get the one before it
    let prev = this._get(idx - 1);

    let newNode = new Node(val);
    
    newNode.next = prev.next;
    prev.next = newNode;

    this.length += 1;
  }


	/** removeAt(idx): return & remove item at idx, */

	BAremoveAt(idx) {
		if (idx < 0 || idx >= this.length) {
			return null;
		} else if (idx === 0) {
			// remove a node from the beginning of the List
			return this.shift();
		} else if (idx === this.length - 1) {
			// remove a node from the end of the List
			return this.pop();
		} else {
			// find the node before the nodeToRemove
			//lst.remove(2); at index 2 remove value
			//example [1,2,3,4] idx = [0,1,2,3]
			//preNodeToRemove = idx 2-1 =1. val @ 1 is 2
			const preNodeToRemove = this.getAt(idx - 1);

			// the node to remove is the given idx's previous idx node
			// preNodeToRemove.next 2.next(which is 3) is nodeToRemove
			const nodeToRemove = preNodeToRemove.next;

			// nodeToRemove = idx 2 or val 3
			//preNodeToRemove.next = idx 3 or val 4
			preNodeToRemove.next = nodeToRemove.next; // from A -> B -> C to A -> C

			// decrease the List's length by 1
			this.length -= 1;

			// return the new node
			return nodeToRemove;
		}
	}

  removeAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index.");
    }

    // special case: remove first item

    if (idx === 0) {
      let val = this.head.val;
      this.head = this.head.next;
      this.length -= 1;
      //why specifically 2
      if (this.length < 2) this.tail = this.head;
      return val;
    }

    let prev = this._get(idx - 1);

    // special case: remove tail

    if (idx === this.length - 1) {
      let val = prev.next.val;
      prev.next = null;
      this.tail = prev;
      this.length -= 1;
      return val;
    }

    // normal case: remove in middle

    let val = prev.next.val;
    prev.next = prev.next.next;
    this.length -= 1;
    return val;
  }

	/** average(): return an average of all values in the list */

	average() { if (this.length === 0) return 0;

    let total = 0;
    let current = this.head;

    while (current) {
      total += current.val;
      current = current.next;
    }

    return total / this.length;
  }
}

module.exports = LinkedList;
