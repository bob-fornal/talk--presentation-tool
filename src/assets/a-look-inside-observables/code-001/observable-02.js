function dtfndDemo1() {
  const { Observable } = rxjs;
  
  const demo1 = new Observable((subscriber) => {
    console.log('Hello');
    subscriber.next(42);
    subscriber.next(100);
    subscriber.next(200);
    setTimeout(() => {
      subscriber.next(300);
    }, 1000);
  });
  
  console.log('before');
  demo1.subscribe((x) => console.log(x));
  console.log('after');  
}
