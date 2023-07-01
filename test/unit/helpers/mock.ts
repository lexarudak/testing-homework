import { AxiosResponse } from "axios";
import { CartApi, ExampleApi } from "../../../src/client/api";
import { CartState, Product, ProductShortInfo } from "../../../src/common/types";
import { mockProd, mockProds } from "./const";

const basename = '/hw/store';

export const getMockCartApi = (state?: CartState) => {
  const mockCartApi = new CartApi();
  mockCartApi.getState = (): CartState => state || {};
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
  return mockExampleApi;
}



