import { test, expect } from '@playwright/test';

const ORIGIN = 'http://localhost:3000/hw/store'

test.describe('Скриншот тесты', async () => {

  test('Главная страница', async ({ page }) => {
    await page.goto(ORIGIN);
    const screenshot = await page.screenshot({fullPage: true, path: './test/playwright/screens/main.jpg'})
    expect(screenshot).toMatchSnapshot('main')
  });

  test('Страница каталога', async ({ page }) => {
    await page.goto(`${ORIGIN}/catalog`);
    const screenshot = await page.screenshot({fullPage: true, path: './test/playwright/screens/catalog.jpg'})
    expect(screenshot).toMatchSnapshot('catalog')
  });

  test('Страница товара', async ({ page }) => {
    await page.goto(`${ORIGIN}/catalog/0`);
    const screenshot = await page.screenshot({fullPage: true, path: './test/playwright/screens/product.jpg'})
    expect(screenshot).toMatchSnapshot('product')
  });

  test('Страница доставки', async ({ page }) => {
    await page.goto(`${ORIGIN}/delivery`);
    const screenshot = await page.screenshot({fullPage: true, path: './test/playwright/screens/delivery.jpg'})
    expect(screenshot).toMatchSnapshot('delivery')
  });

  test('Страница контактов', async ({ page }) => {
    await page.goto(`${ORIGIN}/contacts`);
    const screenshot = await page.screenshot({fullPage: true, path: './test/playwright/screens/contacts.jpg'})
    expect(screenshot).toMatchSnapshot('contacts')
  });

  test('Страница корзины', async ({ page }) => {
    await page.goto(`${ORIGIN}/cart`);
    const screenshot = await page.screenshot({fullPage: true, path: './test/playwright/screens/cart.jpg'})
    expect(screenshot).toMatchSnapshot('cart')
  });

})