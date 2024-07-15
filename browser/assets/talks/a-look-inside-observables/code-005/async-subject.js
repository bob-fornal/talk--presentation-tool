/* The AsyncSubject is a variant where only the
   last value of the Observable execution is
   sent to its observers, and only when the
   execution completes.
*/
function dtfndDemo6() {
  const { AsyncSubject } = rxjs;
  const subject = new AsyncSubject();
   
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
  subject.complete();
}
