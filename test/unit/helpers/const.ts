import { CartState, Product, ProductShortInfo } from "../../../src/common/types";


export const mockProds: ProductShortInfo[] = [
    {
        "id": 0,
        "name": "Refined Towels",
        "price": 424
    },
    {
        "id": 1,
        "name": "Gorgeous Keyboard",
        "price": 210
    },
    {
        "id": 2,
        "name": "Incredible Shirt",
        "price": 825
    },
]

export const mockProd: {[x: number]: Product} = {
  0: {
    "id": 0,
    "name": "Refined Towels",
    "price": 424,
    'description': 'Refined Towels disc',
    'material': 'metal',
    'color': 'red'
  },
  1: {
    "id": 1,
    "name": "Gorgeous Keyboard",
    "price": 210,
    'description': 'Gorgeous Keyboard disc',
    'material': 'plastic',
    'color': 'green'
  },
  2: {
    "id": 2,
    "name": "Incredible Shirt",
    "price": 825,
    'description': 'Incredible Shirt disc',
    'material': 'wood',
    'color': 'blue'
  }
}

const {name, price} = mockProd[0]

export const CART_STATE_0: CartState = {
    0: {
      name: name,
      price: price,
      count: 1,
    },
  }

export const STATIC_TEXT = {
  MAIN: 'Modi corporis consectetur aliquid sit cum tenetur enim. Sed voluptatum quis voluptates laudantium incidunt laudantium. Illo non quos eos vel ipsa. Explicabo itaque est optio neque rerum provident enim qui sed. Corrupti commodi voluptatem vero soluta hic.',
  DELIVERY: 'Deserunt occaecati tempora. Qui occaecati est aliquam. Enim qui nulla ipsam. Incidunt impedit enim consequuntur amet at consequuntur vero. Dolor et ad facere asperiores iste est praesentium quaerat iure. Quibusdam mollitia autem quos voluptas quia est doloremque corporis et. Sed fuga quasi esse perspiciatis fugit maxime. Qui quidem amet.',
  CONTACTS: 'Ut non consequatur aperiam ex dolores. Voluptatum harum consequatur est totam. Aut voluptatum aliquid aut optio et ea. Quaerat et eligendi minus quasi. Culpa voluptatem voluptatem dolores molestiae aut quos iure. Repellat aperiam ut aliquam iure. Veritatis magnam quisquam et dolorum recusandae aut.'
}
