class SimpleObservable {
  #value = null;
  #subscriptions = new Map();

  constructor(value) {
    this.#value = value;
  }

  subscribe(fn) {
    const id = this.#subscriptions.size;
    this.#subscriptions.set(id, fn);
    fn(this.#value);
    return new SimpleSubscription(() => this.#subscriptions.delete(id))
  }

  next(value) {
    this.#value = value;
    this.#subscriptions.forEach((fn) => fn(this.#value));
  }

  pipe(...fnList) {
    const obs = new SimpleObservable();
    const res = fnList.slice(1)
      .reduce((value, fn) => fn(value), fnList[0](this.#value));
    obs.next(res);
    return obs;
  }
}

class SimpleSubscription {
  unsubscribe = null;

  constructor(unsubscribe = () => void 0) {
    this.unsubscribe = unsubscribe;
  }
}

function startSimpleObservable() {
  const observable = new SimpleObservable([
    { name: 'Bob', age: 56 },
    { name: 'Patrick', age: 13 },
    { name: 'Anne', age: 4 }
  ]);

  console.log('--- Subscribing Two Times ---')
  const subscription1 = observable.subscribe(
    ([one, two, three]) => {
      console.log('sub 1', one, two, three)
    }
  );
  observable.pipe(
    ([one, two, three]) => {
      console.log('pipe 1', one.name, two.name, three.name);
    }
  );
  const subscription2 = observable.subscribe(
    ([bob, patrick, anne]) => {
      console.log('sub 2', bob, patrick, anne)
    }
  );

  console.log('--- Next Firing ---');
  observable.next([
    { name: 'Bob', age: 56 },
    { name: 'Patrick', age: 13 },
    { name: 'Jen', age: 45 }
  ]);

  console.log('--- Unsubscribing From 1 ---');
  subscription1.unsubscribe();

  console.log('--- Next Firing ---');
  observable.next([
    { name: 'Bob', age: 56 },
    { name: 'Anne', age: 4 },
    { name: 'Jen', age: 45 }
  ]);
}
