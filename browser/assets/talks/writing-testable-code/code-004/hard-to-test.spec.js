import { LoginPage } from './hard-to-test.js';

describe('LoginPage Class (Hard to Test)', () => {
  let page;
  let control;

  beforeEach(() => {
    control = MockCreateControl();
    const authenticator = new MockAuthenticator();
    const cookies = [new Cookie('g', 'xyz123')];

    const client = control.createMockClient(authenticator);
    const request = control.createMockRequest(cookies);
    page = new LoginPage(client, request);
  });

  it('expects "login" to be working', () => {
    expect(page.login()).toEqual(true);
    control.verify();
  });
});