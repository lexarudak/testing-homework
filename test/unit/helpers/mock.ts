import { AxiosResponse } from "axios";
import { ExampleApi } from "../../../src/client/api";
import { ProductShortInfo } from "../../../src/common/types";
import { mockProds } from "./const";

const basename = '/hw/store';
export const mockExampleApi = new ExampleApi(basename);
mockExampleApi.getProducts = (): Promise<AxiosResponse<ProductShortInfo[], any>> => {
  return new Promise((res) => {
    return res({
      data: mockProds,
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

