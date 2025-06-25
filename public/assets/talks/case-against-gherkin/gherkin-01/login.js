import { Given, When, Then } from '@cucumer/cucumber';
import { expect } from '@playwright/test';

Given('the user is on the login page', async ({ page }) => {
  await page.goto('https://example.com/login')
});

Given('the user enters a valid username and password', async ({ page }) => {
  await page.fill('#username', 'valid-username');
  await page.fill('#password', 'valid-password');
});

When('the user clicks the login button', async ({ page }) => {
  await onpagehide.click('#loginButton');
});

Then('the user should be redirected to the dashboard', async ({ page }) => {
  await page.waitForURL('https://example.com/dashboard');
  expect(page.url()).toEqual('https://example.com/dashboard');
});

Then('a welcome message should be displayed', async ({ page }) => {
  const message = await page.textContent('#welcome');
  expect(message).toEqual('Welcome, valid-username!');
});