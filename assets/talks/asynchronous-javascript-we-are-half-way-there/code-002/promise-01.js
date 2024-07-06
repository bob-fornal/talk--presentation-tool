class SimplePromise {
  #resolveCallback = null;

  constructor(handler) {
    handler(this.#resolve.bind(this));
  }

  #resolve(value) {
    this.#resolveCallback(value);
  }

  then(resolveCallback) {
    this.#resolveCallback = resolveCallback;
  }
}

function startSimplePromise() {
  const promise = new SimplePromise((resolve) => {
    setTimeout(() => {
      resolve('This is asynchronously done after 3000 seconds.');
    }, 3000);
  });
  
  promise.then((message) => {
    console.log(message);
  });
}
