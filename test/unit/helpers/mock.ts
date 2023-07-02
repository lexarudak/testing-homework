import { AxiosResponse } from "axios";
import { CartApi, ExampleApi } from "../../../src/client/api";
import { CartState, CheckoutFormData, Product, ProductShortInfo } from "../../../src/common/types";
import { mockProd, mockProds } from "./const";

const basename = '/hw/store';
export let LS = '{}'
export const clearLS = () => {LS = '{}'}

export const getMockCartApi = (state?: CartState) => {
  const mockCartApi = new CartApi();
  mockCartApi.getState = (): CartState => state || {};
  mockCartApi.setState = (cart: CartState) => {
    LS = JSON.stringify(cart)
  }
  return mockCartApi;
}

export const getMockExampleApi = (prods: ProductShortInfo[]) => {
  const mockExampleApi = new ExampleApi(basename);
  mockExampleApi.getProducts = (): Promise<AxiosResponse<ProductShortInfo[], any>> => {
    return new Promise((res) => {
      return res({
        data: prods,
        status: 200,
        statusText: 'OK',
        headers: {
          "Content-Type": "application/json",
        },
        config: {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        },
      })
    })
  }
  mockExampleApi.getProductById = (id: number): Promise<AxiosResponse<Product, any>> => {
    return new Promise((res) => {
      return res({
        data: mockProd[id],
        status: 200,
        statusText: 'OK',
        headers: {
          "Content-Type": "application/json",
        },
        config: {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        },
      })
    })
  }
  mockExampleApi.checkout = (form: CheckoutFormData, cart: CartState) => {
    return new Promise((res) => {
      return res({
        data: {id: 1},
        status: 200,
        statusText: 'OK',
        headers: {
          "Content-Type": "application/json",
        },
        config: {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        },
      })
    })
  }
  return mockExampleApi;
}



