import { test, expect } from '@playwright/test';

const BASE_URL = 'https://example.com/api/v1';

test('Retrieve a list of fruit', async ({ request }) => {
  const response = await request.get(`${ BASE_URL }/fruits`);
  const responseBody = await response.json();

  expect(response.status()).toEqual(200);
  expect(responseBody.includes({ name: 'Apple', id: 100 }));
});

test('Add a new Fruit', async ({ request }) => {
  const newFruit = { name: 'Banana', id: 101 };

  const response = await request.post(`${ BASE_URL }/fruits`, { data: newFruit });
  const responseBody = await response.json();

  expect(response.status()).toEqual(201);
  expect(responseBody).toEqual({
    message: 'Fruit added successfully,',
    fruit: newFruit,
  });
});