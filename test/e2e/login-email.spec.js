import { test, expect } from '@playwright/test';

test.describe('Email/Password Login', () => {
  test('user can login with valid credentials', async ({ page }) => {
    // ไปหน้า login
    await page.goto('/login');

    // คลิกปุ่ม Sign In เพื่อโชว์ form email/password
    await page.click('button:has-text("Sign In")');

    // กรอก email + password
    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'password123');

    // คลิกปุ่ม Sign In ใน form
    await page.click('button:has-text("Sign In")');

    // รอ redirect ไปหน้า home
    await page.waitForURL('/home');
  });

  test('shows error message with invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.click('button:has-text("Sign In")');

    await page.fill('input[name="email"]', 'testuser@example.com');
    await page.fill('input[name="password"]', 'wrongpass');

    await page.click('button:has-text("Sign In")');
  });
});
