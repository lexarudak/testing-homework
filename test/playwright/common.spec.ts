import { test, expect } from '@playwright/test';

const ORIGIN = 'http://localhost:3000/hw/store'

test.describe('Тесты товаров', async () => {
  test('На ширине 576px "бургер" должен скрываться', async ({ page }) => {
    await page.setViewportSize({
      width: 576,
      height: 780,
    });
    await page.goto(ORIGIN);
    const burgerBtn = await page.$('[aria-label="Toggle navigation"]');
    if (!burgerBtn) return
    const isVisible = await burgerBtn.isVisible();
    expect(isVisible).toBeFalsy();
  });

  test('На ширине меньше 576px навигационное меню должно скрываться за "бургер"', async ({ page }) => {
    await page.setViewportSize({
      width: 575,
      height: 780,
    });
    await page.goto(ORIGIN);
    const burgerBtn = await page.$('[aria-label="Toggle navigation"]');
    if (!burgerBtn) return
    const isVisible = await burgerBtn.isVisible();
    expect(isVisible).toBeTruthy();
  });

  test('При выборе элемента из меню "гамбургера", меню должно закрываться', async ({ page }) => {
    await page.setViewportSize({
      width: 575,
      height: 780,
    });
    await page.goto(ORIGIN);
    const burgerBtn = await page.$('[aria-label="Toggle navigation"]');
    const menu = await page.$('.Application-Menu')
    if (!burgerBtn || !menu) return
    const links = await menu.$$('a')

    let i = 0
    while (i < links.length) {
      await burgerBtn.click()
      expect(await menu.isVisible()).toBeTruthy();
      await links[i].click()
      expect(await menu.isVisible()).toBeFalsy();
      i++
    }
  })
})
