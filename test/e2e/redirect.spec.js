//redirect.spec.js

import { test, expect } from '@playwright/test';

test('Redirect unauthenticated user to login page', async ({ page }) => {
  // ล้าง localStorage ให้แน่ใจว่าไม่มี user
  await page.goto('/');
  await page.evaluate(() => localStorage.removeItem('user'));

  // พยายามเข้า /home โดยตรง
  await page.goto('/home');

  // รอ redirect
  await page.waitForURL('/login');
  
  // ตรวจสอบว่าปุ่ม Sign In ปรากฏ (ยืนยันว่าอยู่หน้า login)
  await expect(page.locator('text=Sign In')).toBeVisible();
});
