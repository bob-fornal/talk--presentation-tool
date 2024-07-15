class ChainingPromise {
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
    return new ChainingPromise((resolve, reject) => {
      switch (this.status) {
        case 'pending':
          this.#onFullfilledCallback.push(() => {
            try {
              const fulfilledFromLastPromise = onFulfilled(this.#value);
              if (fulfilledFromLastPromise instanceof ChainingPromise) {
                fulfilledFromLastPromise.then(resolve, reject);
              } else {
                resolve(fulfilledFromLastPromise);
              }
            } catch (error) {
              reject(error);
            }
          });
          this.#onRejectedCallback.push(() => {
            try {
              const rejectedFromLastPromise = onRejected(this.#value);
              if (rejectedFromLastPromise instanceof ChainingPromise) {
                rejectedFromLastPromise.then(resolve, reject);
              } else {
                reject(rejectedFromLastPromise);
              }
            } catch (error) {
              reject(error);
            }
          });
          break;
        case 'fulfilled':
          try {
            const fulfilledFromLastPromise = onFulfilled(this.#value);
            if (fulfilledFromLastPromise instanceof ChainingPromise) {
              fulfilledFromLastPromise.then(resolve, reject);
            } else {
              resolve(fulfilledFromLastPromise);
            }
          } catch (err) {
            reject(err);
          }
          break;
        case 'rejected':
          try {
            const rejectedFromLastPromise = onRejected(this.#value);
            if (rejectedFromLastPromise instanceof ChainingPromise) {
              rejectedFromLastPromise.then(resolve, reject);
            } else {
              reject(rejectedFromLastPromise);
            }
          } catch (err) {
            reject(err);
          }
          break;
      }
    });
  }
}

function startChainingPromise() {
  const p1 = new ChainingPromise((resolve, reject) => {
    setTimeout(() => resolve('Resolved First One!'), 1000);
  });

  p1.then((res) => {
    console.log(res);
    return new ChainingPromise((resolve) => {
      setTimeout(() => resolve('Resolved Second One!!!'), 1000);
    });
  }).then((res) => {
    console.log(res);
  });
}
