class ImprovedPromise {
  status = '';
  #value = null;
  #onFullfilledCallback = [];
  #onRejectedCallback = [];

  constructor(handler) {
    this.status = 'pending';
    this.#value = null;
    this.#onFullfilledCallback = [];
    this.#onRejectedCallback = []

    try {
      handler(this.#resolve.bind(this), this.#reject.bind(this));
    } catch (error) {
      this.#reject(error);
    }
  }

  #resolve(value) {
    if (this.status === 'pending') {
      this.status = 'fulfilled';
      this.#value = value;
      this.#onFullfilledCallback.forEach((fn) => fn(value));
    }
  }

  #reject(value) {
    if (this.status === 'pending') {
      this.status = 'rejected';
      this.#value = value;
      this.#onRejectedCallback.forEach((fn) => fn(value));
    }
  }

  then(onFulfilled, onRejected) {
    switch (this.status) {
      case 'pending':
        this.#onFullfilledCallback.push(onFulfilled);
        this.#onRejectedCallback.push(onRejected);
        break;
      case 'fulfilled':
        onFulfilled(this.#value);
        break;
      case 'rejected':
        onRejected(this.#value);
        break;
    }
  }
}

function startImprovedPromiseResolve() {
  const p1 = new ImprovedPromise((resolve, reject) => {
    resolve('Resolved!!!');
  });

  p1.then((res) => {
    console.log(res);
  }, (err) => {
    console.log(err);
  });
}

function startImprovedPromiseReject() {
  const p2 = new ImprovedPromise((resolve, reject) => {
    reject('Rejected!!!');
  });

  p2.then((res) => {
    console.log(res);
  }, (err) => {
    console.log(err);
  });
}

function startImprovedPromiseAsync() {
  const p3 = new ImprovedPromise((resolve, reject) => {
    setTimeout(() => resolve('Async Resolved!!!'), 1000);
  });

  p3.then((res) => {
    console.log(res);
  }, (err) => {
    console.log(err);
  });
}
