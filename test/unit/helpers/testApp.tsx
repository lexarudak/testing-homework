import { BrowserRouter } from "react-router-dom";
import { CartApi, ExampleApi } from "../../../src/client/api";
import { initStore } from "../../../src/client/store";
import { CartState, ProductShortInfo } from "../../../src/common/types";
import { Provider } from "react-redux";
import { Application } from "../../../src/client/Application";
import React from "react";
import { getMockCartApi, getMockExampleApi } from "./mock";

export const testApp = (prods: ProductShortInfo[], cartState?: CartState) => {
  const store = initStore(getMockExampleApi(prods), getMockCartApi(cartState));
  return (
      <BrowserRouter >
          <Provider store={store}>
              <Application />
          </Provider>
      </BrowserRouter>
  );
}
