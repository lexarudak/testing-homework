import '@testing-library/jest-dom';
import events from '@testing-library/user-event'
import { CART_STATE_0, VALID_ADDRESS, VALID_NAME, VALID_PHONE, mockProds } from './helpers/const';
import { getPage } from './helpers/helpers';

describe('Тесты формы', () => {
  it('На странице заказа отображается форма', async () => {
    const { queryByRole, queryByText, getAllByRole } = await getPage("Cart (1)", mockProds, CART_STATE_0)

    expect(queryByRole('button', {name: /checkout/i})).toBeInTheDocument()
    expect(queryByText('Name')).toBeInTheDocument()
    expect(queryByText('Phone')).toBeInTheDocument()
    expect(queryByText('Address')).toBeInTheDocument()
    expect(getAllByRole('textbox').length).toEqual(3)
  
  });

  it('Проверка отправки формы', async () => {
    const { getByLabelText, getByRole, queryByText } = await getPage("Cart (1)", mockProds, CART_STATE_0)

    const btn = getByRole('button', {name: /checkout/i})
    const nameInput = getByLabelText('Name') as HTMLTextAreaElement
    const phoneInput = getByLabelText('Phone') as HTMLTextAreaElement
    const addressInput = getByLabelText('Address') as HTMLTextAreaElement
    await events.type(phoneInput, VALID_PHONE)
    await events.type(addressInput, VALID_ADDRESS)
    expect(queryByText('Well done!')).not.toBeInTheDocument()
    await events.type(nameInput, VALID_NAME)
    await events.click(btn)
    expect(queryByText('Well done!')).toBeInTheDocument()
  });

  it('Проверка валидности формы', async () => {
    const { getByLabelText, getByRole, queryByText } = await getPage("Cart (1)", mockProds, CART_STATE_0)

    const btn = getByRole('button', {name: /checkout/i})
    const nameInput = getByLabelText('Name')
    const phoneInput = getByLabelText('Phone') 
    const addressInput = getByLabelText('Address')
    await events.click(btn)
    expect(btn).toBeInTheDocument()

    await events.type(phoneInput, VALID_PHONE)
    await events.type(nameInput, VALID_NAME)
    await events.type(addressInput, VALID_ADDRESS)
    await events.click(btn)
    expect(btn).not.toBeInTheDocument()

  });
})