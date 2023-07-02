import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { testApp } from './helpers/testApp';
import events from '@testing-library/user-event'
import { CART_STATE_0, CART_STATE_0_2, mockProd, mockProds } from './helpers/const';
import { getPage } from './helpers/helpers';
import { createMemoryHistory } from 'history';

describe('Тесты страницы каталога', () => {

  it('В корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async () => {
    const { queryByRole, getByRole } = await getPage("Cart (3)", mockProds, CART_STATE_0_2)
    expect(queryByRole('link', {name: 'catalog'})).not.toBeInTheDocument()

    const cleanBtn = getByRole('button', {name: 'Clear shopping cart'})
    await events.click(cleanBtn)
    expect(queryByRole('link', {name: 'catalog'})).toBeInTheDocument()
  
  });

  it('Если корзина пустая, должна отображаться ссылка на каталог товаров', async () => {
    const { queryByRole } = await getPage("Cart", mockProds)
    expect(queryByRole('link', {name: 'catalog'})).toBeInTheDocument()
  });

  it('В шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', async () => {
    const { queryByRole, getAllByRole, getByRole } = await getPage("Catalog", mockProds)
    expect(queryByRole('link', {name: 'Cart'})).toBeInTheDocument()
    await events.click(getAllByRole('link', {name: 'Details'})[0])

    const addBtn = getByRole('button', {name: /add to cart/i})
    await events.click(addBtn)
    expect(queryByRole('link', {name: 'Cart'})).not.toBeInTheDocument()
    expect(queryByRole('link', {name: 'Cart (1)'})).toBeInTheDocument()
    await events.click(addBtn)
    expect(queryByRole('link', {name: 'Cart (1)'})).toBeInTheDocument()
    await events.click(getByRole('link', {name: 'Catalog'}))
    await events.click(getAllByRole('link', {name: 'Details'})[1])

    const addBtn2 = getByRole('button', {name: /add to cart/i})
    await events.click(addBtn2)
    expect(queryByRole('link', {name: 'Cart (2)'})).toBeInTheDocument()
    await events.click(addBtn2)
    expect(queryByRole('link', {name: 'Cart (2)'})).toBeInTheDocument()
  });

  it('В корзине должна отображаться таблица с добавленными в нее товарами', async () => {
    const { getByText, getByRole } = await getPage("Cart (3)", mockProds, CART_STATE_0_2)

    expect(getByRole('columnheader', {name: '#'})).toBeInTheDocument()
    expect(getByRole('columnheader', {name: /product/i})).toBeInTheDocument()
    expect(getByRole('columnheader', {name: /price/i})).toBeInTheDocument()
    expect(getByRole('columnheader', {name: /count/i})).toBeInTheDocument()
    expect(getByRole('columnheader', {name: /total/i})).toBeInTheDocument()
    for (let key in CART_STATE_0_2) {
      expect(getByText(CART_STATE_0_2[key].name)).toBeInTheDocument()
    }
  });

    it('Для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа', async () => {
    const { getByText, getAllByText } = await getPage("Cart (3)", mockProds, CART_STATE_0_2)

    let sum = 0;
    for (let key in CART_STATE_0_2) {
      expect(getByText(CART_STATE_0_2[key].name)).toBeInTheDocument()
      expect(getAllByText(`$${CART_STATE_0_2[key].price}`).length).toEqual(2)
      sum += CART_STATE_0_2[key].price
    }
    expect(getByText(`$${sum}`)).toBeInTheDocument()
  });

})