import { test, expect } from '@playwright/test';

const ORIGIN = 'http://localhost:3000/hw/store'

test.describe('Тест подтверждения покупки', async () => {
  test('Сообщение о покупке корректно', async ({ page }) => {

    await page.goto(`${ORIGIN}/catalog/0`);
    await (page.getByRole('button', {name: 'Add to Cart'})).click()
    await (page.getByRole('link', {name: 'Cart (1)'})).click()

    const name = page.getByLabel('Name');
    const phone = page.getByLabel('Phone');
    const address = page.getByLabel('Address');

    await name.fill('Name')
    await phone.fill('80298518213')
    await address.fill('Minsk')

    await (page.getByRole('button', {name: 'Checkout'})).click()

    const screenshot = await page.screenshot({
      mask: [
        page.locator('p'), 
      ],
      maskColor: 'blue'})

    expect(screenshot).toMatchSnapshot({
      name: 'pur.png'
    })
  });
})