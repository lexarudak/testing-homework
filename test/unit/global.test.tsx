import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { testApp } from './helpers/testApp';
import { mockProds } from './helpers/const';


describe('Тесты хедера', () => {
  const LINKS_LIST = [
    ['Example store', '/'],
    ['Catalog', '/catalog'],
    ['Delivery', '/delivery'],
    ['Contacts', '/contacts'],
    ['Cart', '/cart'],
  ]

  const testLink = (link_index: number) => {
    const { getByRole } = render(testApp(mockProds));
    const nav = getByRole("navigation");
    const links = nav.querySelectorAll('a') 
    const { innerHTML, href } = links.item(link_index);
    const [name, path] = LINKS_LIST[link_index];
    const { pathname } = new URL(href);

    expect(path).toEqual(pathname);
    expect(innerHTML).toBe(name);
  }

    it('Название магазина в шапке должно быть ссылкой на главную страницу', () => testLink(0));

    it('В шапке отображается ссылка на каталог', () => testLink(1));

    it('В шапке отображается ссылка на страницу доставки', () => testLink(2));

    it('В шапке отображается ссылка на страницу контактов', () => testLink(3));

    it('В шапке отображается ссылка на страницу корзины', () => testLink(4));
});
