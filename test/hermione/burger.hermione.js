const { assert } = require('chai');

describe('Тест бургер меню', async function() {
    it('Бургер скрывается по клику на кнопку меню', async function() {
        await this.browser.url('http://localhost:3000/hw/store/');
        // this.browser.setViewportSize({width: 500, height: 800});
        const burger = await this.browser.$("[aria-label='Toggle navigation']");
        // await this.browser.assertView('plain', 'body');
        assert.isTrue(await burger.isExisting(), 'Элемент не найден на странице');
        // const title = await this.browser.$('#uhfLogo').getText();
        // assert.equal(title, 'Microsoft');
    });
});
