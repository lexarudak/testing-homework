import { test, expect } from '@playwright/test';

const ORIGIN = 'http://localhost:3000/hw/store'

test.describe('Тесты товаров', async () => {
  test('Подробная информация о каждом товаре соответствует сокращенной', async ({ page }) => {
    await page.goto(`${ORIGIN}/catalog`);

    let i = 0

    while (i < 3) {
      const products = await page.$$('.ProductItem');
      const nameShort = await products[i].$('h5')
      const nameShortText = (await nameShort?.innerText() || '').trim().toLowerCase()
      const priceShort = await products[i].$('.ProductItem-Price')
      const priceShortText = (await priceShort?.innerText() || '').trim().toLowerCase()

      const btn = await products[i].$('a')
      await btn?.click()

      const nameFull = page.locator('.ProductDetails-Name')
      const nameFullText = (await nameFull.innerText() || '').trim().toLowerCase()
      const priceFull = page.locator('.ProductDetails-Price')
      const priceFullText = (await priceFull?.innerText() || '').trim().toLowerCase()

      expect(nameShortText).toEqual(nameFullText)
      expect(priceShortText).toEqual(priceFullText)

      const catalog = page.getByRole('link', {name: 'Catalog'})
      await catalog.click()
      i++
    }
  });
})