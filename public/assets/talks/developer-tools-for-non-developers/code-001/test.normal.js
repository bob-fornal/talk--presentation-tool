function dtfndInit001(args) {
  console.log('testing this');

  var myFunc1 = () => {
    encodeURI('\uD800'); // URIError
  }
  var myFunc2 = () => {
    a = l; // ReferenceError
  }
  var myFunc3 = () => {
    null.f(); // TypeError
  }
  
  try {
    myFunc1();
  } catch (error) {
    console.log(error);
  }
  
  try {
    myFunc2();
  } catch (error) {
    console.log(error);
  }
  
  try {
    myFunc3();
  } catch (error) {
    console.log(error);
  }

  (function*(){})().throw(new Error("example"));
}