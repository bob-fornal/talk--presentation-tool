export class LoginPage {
  cookie;
  authenticator;

  constructor(cookie, authenticator) {
    this.cookie = cookie;
    this.authenticator = authenticator;
  }

  login() {
    const cookie = request.getCookie();
    return this.authenticator.authenticate(cookie);
  }
}