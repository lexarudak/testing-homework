import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { testApp } from './helpers/testApp';
import events from '@testing-library/user-event'
import { CART_STATE_0, mockProd, mockProds } from './helpers/const';
import { getPage } from './helpers/helpers';

describe('Тесты страницы каталога', () => {

  it('Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', async () => {
    const { getAllByRole, queryByText } = await getPage("Catalog", mockProds)
    const goodsAndTitle = getAllByRole('heading')
    const goodsAndTitleText = goodsAndTitle.map((val) => val.innerHTML)
    const links = getAllByRole('link', {name: 'Details'}) as HTMLAnchorElement[]

    mockProds.forEach(({id, name, price}) => {
      expect(goodsAndTitleText).toContain(name)
      expect(queryByText(`$${price}`)).toBeInTheDocument()
      expect(links.find((val) => val.href.includes(id.toString()))).not.toBeUndefined()
    })
  });

  it('Для первого товара в каталоге на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', async () => await checkPage(0))

  it('Для второго товара в каталоге на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', async () => await checkPage(1))

  it('Для первого третьего в каталоге на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', async () => await checkPage(2))

  it('если товар уже добавлен в корзину, в каталоге  отображается сообщение', async () => {
    const { queryByText, getByRole } = render(testApp([mockProds[0]], CART_STATE_0));
    await events.click(getByRole('link', {name: "Catalog"}))
    expect(queryByText('Item in cart')).toBeInTheDocument()
  })

    it('если товар уже добавлен в корзину, в на странице товара отображается сообщение', async () => {
    const { queryByText, getByRole } = render(testApp([mockProds[0]], CART_STATE_0));
    await events.click(getByRole('link', {name: "Catalog"}))
    await events.click(getByRole('link', {name: 'Details'}))
    expect(queryByText('Item in cart')).toBeInTheDocument()
  })

  it('если товар не добавлен в корзину, в каталоге  не отображается сообщение об этом', async () => {
    const { queryByText, getByRole } = render(testApp([mockProds[0]]));
    await events.click(getByRole('link', {name: "Catalog"}))
    expect(queryByText('Item in cart')).not.toBeInTheDocument()
  })

  it('если товар не добавлен в корзину, на странице товара не отображается сообщение об этом', async () => {
    const { queryByText, getByRole } = render(testApp([mockProds[0]]));
    await events.click(getByRole('link', {name: "Catalog"}))
    await events.click(getByRole('link', {name: 'Details'}))
    expect(queryByText('Item in cart')).not.toBeInTheDocument()
  })

  it('если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async () => {
    const { queryAllByText, getByRole } = render(testApp([mockProds[0]], CART_STATE_0));
    const { price } = CART_STATE_0[0]
    await events.click(getByRole('link', {name: "Cart (1)"}))

    expect(queryAllByText(`$${price}`).length).toEqual(3)

    await events.click(getByRole('link', {name: 'Catalog'}))
    await events.click(getByRole('link', {name: 'Details'}))
    await events.click(getByRole('button', {name: 'Add to Cart'}))
    await events.click(getByRole('link', {name: "Cart (1)"}))

    expect(queryAllByText(`$${price}`).length).toEqual(1)
    expect(queryAllByText(`$${price * 2}`).length).toEqual(2)
  })

  async function checkPage(goodId: number) {
    const { getAllByRole, getByRole, queryByText } = await getPage("Catalog", mockProds)
    const links = getAllByRole('link', {name: 'Details'}) as HTMLAnchorElement[]
    const link = links.filter(({href}) => href.includes(`/${goodId}`))[0]
    await events.click(link)
    const {name, description, price, material, color} = mockProd[goodId]

    expect(getByRole('heading', {name: name}))
    expect(getByRole('button', {name: 'Add to Cart'}))
    expect(queryByText(description)).toBeInTheDocument()
    expect(queryByText(`$${price}`)).toBeInTheDocument()
    expect(queryByText(material)).toBeInTheDocument()
    expect(queryByText(color)).toBeInTheDocument()
  }
   
});