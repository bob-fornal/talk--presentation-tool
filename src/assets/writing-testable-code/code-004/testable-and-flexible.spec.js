import { LoginPage } from './testable-and-flexible.js';

describe('LoginPage Class (Testable and Flexible)', () => {
  let page;
  let control;

  beforeEach(() => {
    const authenticator = new MockAuthenticator();
    const cookie = new Cookie('g', 'xyz123');
    page = new LoginPage(cookie, authenticator);
  });

  it('expects "login" to be working', () => {
    expect(page.login()).toEqual(true);
  });
});