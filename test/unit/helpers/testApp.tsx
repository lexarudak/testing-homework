import { BrowserRouter } from "react-router-dom";
import { CartApi, ExampleApi } from "../../../src/client/api";
import { initStore } from "../../../src/client/store";
import { CartState } from "../../../src/common/types";
import { Provider } from "react-redux";
import { Application } from "../../../src/client/Application";
import React from "react";
import { mockExampleApi } from "./mock";

export const initStateTest1: CartState = {
    1: {
      name: 'test name',
      price: 4,
      count: 1,
    },
  }


export const testApp = (initState = {}) => {
  const cart = new CartApi();
  cart.getState = (): CartState => initState;
  const store = initStore(mockExampleApi, cart);
  return (
      <BrowserRouter >
          <Provider store={store}>
              <Application />
          </Provider>
      </BrowserRouter>
  );
}
