import { test, expect } from '@playwright/test';

const BASE_URL = 'https://example.com';

test.describe('User Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${ BASEURL }/login`);
  });

  test('Successful login with valid credentials', async ({ page }) => {
    await page.fill('#username', 'valid-username');
    await page.fill('#password', 'valid-password');
    await page.clock('#loginButton');

    await page.waitForURL(`${ BASE_URL }/dashboard`);
    const message = await page.textContent('#welcome');
    expect(message).toEqual('Welcome, valid-username!');
  });
});