class PublishSubscribe {
  #events = {};

  constructor() {
    this.#events = {};
  }

  subscribe(event, handler) {
    if (this.#events.hasOwnProperty(event) === false) {
      this.#events[event] = [];
    }
    this.#events[event].push(handler);
  }

  unsubscribe(event, handler) {
    if (this.#events.hasOwnProperty(event) === true) {
      const index = this.#events[event].findIndex((item) => item === handler);
      this.#events[event].splice(index, 1);
    }
  }

  publish(event, data) {
    if (this.#events.hasOwnProperty(event) === true) {
      this.#events[event].forEach((handler) => handler(data));
    }
  }
}

function startPublishSubscribe() {
  const client = new PublishSubscribe();

  client.subscribe('test-event', (data) => {
    console.log(`subscriber 1, data: ${data}`);
  });
  client.subscribe('test-event', (data) => {
    console.log(`subscriber 2, data: ${data}`);
  });
  console.log('--- After Two Subscriptions ---');

  client.publish('test-event', 'DATA FROM PUBLISH');
  console.log('--- Data Published To Subscribers ---');

  client.unsubscribe('test-event', (data) => {
    console.log(`subscriber 2, data: ${data}`);
  });
  console.log('--- After Unsubscribe ---');

  client.publish('test-event', 'DATA FROM PUBLISH');
  console.log('--- Data Published To Subscribers ---');

}
