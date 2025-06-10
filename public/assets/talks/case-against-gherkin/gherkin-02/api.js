import { Given, When, Then } from '@cucumer/cucumber';
import { expect, request } from '@playwright/test';

let baseURL;
let response;
let payload;

Given('the API base URL is {string}', (url) => {
  baseURL = url;
});

Given('the request payload is:', (docPayload) => {
  payload = JSON.parse(docPayload);
});

When('the system sends a GET request to {string}', async (endpoint) => {
  const apiContext = await request.newContext();
  response = await apiContext.get(baseURL + endpoint);
});

When('the system sends a POST request to {string} with the payload', async (endpoint) => {
  const apiContext = await request.newContext();
  response = await apiContext.post(baseURL + endpoint, { data: payload });
});

Then('the response status code should be {int}', (statusCode) => {
  expect(response.status()).toEqual(statusCode);
});

Then('the list should include {string}', async (fruit) => {
  const responseBody = await response.json();
  expect(responseBody.includes(fruit)).toEqual(true);
});
