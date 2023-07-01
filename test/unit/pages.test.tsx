import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { testApp } from './helpers/testApp';
import events from '@testing-library/user-event'
import { STATIC_TEXT } from './helpers/const';


describe('Тесты наличия страниц', () => {

  const testPage = async (buttonName: string, mainPage?: string) => {
    const { getByText, getByRole } = render(testApp());
    const btn = getByText(buttonName);
    await events.click(btn)
    // screen.logTestingPlaygroundURL()
    if (mainPage) {
      const btnHome = getByText(mainPage);
      await events.click(btnHome)
      expect(getByRole('heading', {name: /quickly/i})).toBeInTheDocument()
    } else {
      const title = getByRole('heading', {name: new RegExp(buttonName, "i")})
      expect(title).toBeInTheDocument()
    }
  }

    it('Переход на страницу Контактов по клику на хедере', async () => await testPage('Contacts'));
    it('Переход на страницу Корзины по клику на хедере', async () => await testPage('Cart'));
    it('Переход на страницу Доставки по клику на хедере', async () => await testPage('Delivery'));
    it('Переход на страницу Каталога по клику на хедере', async () => await testPage('Catalog'));
    it('Переход на Домашнюю страницу по клику на хедере', async () => await testPage('Cart', 'Example store'));
});

describe('Тесты статического содержания страниц', () => {
  // тесты намеренно проверяют лиш часть статической информации на странице, чтобы не падали при изменение любого текста страницы

  const testPageContent = async (buttonName: string, content: string) => {
    const { getByText } = render(testApp());
    const btn = getByText(buttonName);
    await events.click(btn)
    expect(getByText(content)).toBeInTheDocument()
  }

  const { MAIN, DELIVERY, CONTACTS } = STATIC_TEXT;

    it('Переход на страницу Доставки по клику на хедере', async () => await testPageContent('Delivery', DELIVERY));
    it('Переход на страницу Контактов по клику на хедере', async () => await testPageContent('Contacts', CONTACTS));
    it('Переход на Домашнюю страницу по клику на хедере', async () => await testPageContent('Example store', MAIN));

})