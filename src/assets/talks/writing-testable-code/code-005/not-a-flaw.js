// A DSL may be an acceptable violation.
const person = FakeObject.createAPerson();

const zipcode1 = person
  .getHouse()    // returns a house object
  .getAddress()  // returns an address object
  .getZipcode(); // returns a zipcode object

const zipcode2 = person.getZipcode();
