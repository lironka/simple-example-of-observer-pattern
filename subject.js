class Subject {
  observerList = []; // in js 2019 you can miss constructor

  /** Emit new data to all observers */
  next(newData) {
    const emitData = newData; // do what you want. I just emit the same.

    /** Send data to each observer */
    for (const index in this.observerList) {
      let observer = this.observerList[index];
      observer(emitData);
    }
  }

  /** Obsrver function */
  subscribe(observer) {
    this.observerList.push(observer);

    /** 
     * Return Subscription object for unsubscribe the observer 
     * WARNING! Not unsubscribed - memory leaked
     */
    return {
      observer: observer,
      subjectObj: this, // add scope of class instance;
      unsubscribe: function () {
        // current `this` is the scope of Subscription object, not the class scope
        const index = this.subjectObj.indexOf(this.observer);
        this.subjectObj.removeObserver(index);
      }
    };
  }

  length() {
    return this.observerList.length;
  }

  removeObserver(inx) {
    this.observerList.splice(inx, 1);
  }

  indexOf(observer, startIndex = 0) {
    var i = startIndex;

    while (i < this.observerList.length) {
      if (this.observerList[i] === observer) {
        return i;
      }
      i++;
    }
    return -1;
  }
}

module.exports = Subject;