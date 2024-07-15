/* A ReplaySubject records multiple values from
   the Observable execution and replays them to
   new subscribers.
*/
function dtfndDemo4() {
  const { ReplaySubject } = rxjs;
  // buffer 3 values for new subscribers
  const subject = new ReplaySubject(3);
   
  subject.subscribe({
    next: (v) => console.log(`observerA: ${v}`),
  });
   
  subject.next(1);
  subject.next(2);
  subject.next(3);
  subject.next(4);
   
  subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`),
  });
   
  subject.next(5);
}
