export class LoginPage {
  client;
  request;

  constructor(client, request) {
    this.client = client;
    this.request = request;
  }

  login() {
    const cookie = request.getCookie();
    return this.client.getAuthenticator().authenticate(cookie);
  }
}