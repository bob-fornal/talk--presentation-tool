/* BehaviorSubjects are useful for representing "values
   over time". For instance, an event stream of birthdays
   is a Subject, but the stream of a person's age would
   be a BehaviorSubject.
*/
function dtfndDemo3() {
  const { BehaviorSubject } = rxjs;
  
  // 0 is the initial value
  const subject = new BehaviorSubject(0);
   
  subject.subscribe({
    next: (v) => console.log(`observerA: ${v}`),
  });
   
  subject.next(1);
  subject.next(2);
   
  subject.subscribe({
    next: (v) => console.log(`observerB: ${v}`),
  });
   
  subject.next(3);  
}
