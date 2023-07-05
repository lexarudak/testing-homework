import { test, expect } from '@playwright/test';

const ORIGIN = 'http://localhost:3000/hw/store'

test.describe('Скриншот тесты', async () => {

  test('Главная страница', async ({ page }) => {
    await page.goto(ORIGIN);
    const screenshot = await page.screenshot({
      
      path: './test/playwright/screens/main.png', 
    })
    expect(screenshot).toMatchSnapshot({
      name: 'main.png'
    })
  });

  test('Страница каталога', async ({ page }) => {
    await page.goto(`${ORIGIN}/catalog`);
    const screenshot = await page.screenshot({
            path: './test/playwright/screens/catalog.png', 
      mask: [page.locator('.ProductItem')],
      maskColor: 'blue'
    })
    expect(screenshot).toMatchSnapshot({
      name: 'catalog.png'
    })
  });

  test('Страница товара', async ({ page }) => {
    await page.goto(`${ORIGIN}/catalog/0`);
    const screenshot = await page.screenshot({
      
      path: './test/playwright/screens/product.png',
      mask: [
        page.locator('.ProductDetails-Name'), 
        page.locator('.ProductDetails-Description'),
        page.locator('.ProductDetails-Price'),
        page.locator('.ProductDetails-Color'),
        page.locator('.ProductDetails-Material')
      ],
      maskColor: 'blue',
      fullPage: true
    })
    expect(screenshot).toMatchSnapshot({
      name: 'prod.png'
    })
  });

  test('Страница доставки', async ({ page }) => {
    await page.goto(`${ORIGIN}/delivery`);
    const screenshot = await page.screenshot({path: './test/playwright/screens/delivery.png'})
    expect(screenshot).toMatchSnapshot({
      name: 'delivery.png'
    })
  });

  test('Страница контактов', async ({ page }) => {
    await page.goto(`${ORIGIN}/contacts`);
    const screenshot = await page.screenshot({path: './test/playwright/screens/contacts.png'})
    expect(screenshot).toMatchSnapshot({
      name: 'contacts.png'
    })
  });

  test('Страница корзины', async ({ page }) => {
    await page.goto(`${ORIGIN}/cart`);
    const screenshot = await page.screenshot({path: './test/playwright/screens/cart.png'})
    expect(screenshot).toMatchSnapshot({
      name: 'cart.png'
    })
  });

})