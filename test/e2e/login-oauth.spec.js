// login-oauth.spec.js
import { test, expect } from '@playwright/test';

test('Google OAuth login mock', async ({ page }) => {
  // เปิดหน้า login
  await page.goto('/');

  // แทนที่จะคลิกปุ่ม Google
  await page.goto('http://localhost:5000/auth/google/callback-mock');

  // รอหน้า home
  await page.waitForURL('/home');
});
