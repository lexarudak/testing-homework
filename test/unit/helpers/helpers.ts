import { testApp } from "./testApp";
import '@testing-library/jest-dom';
import events from '@testing-library/user-event'
import { render } from '@testing-library/react';
import { CartState, ProductShortInfo } from "../../../src/common/types";

export async function getPage(pageName: string, mockProds: ProductShortInfo[], cartState?: CartState ) {
    const page = render(testApp(mockProds, cartState));
    await events.click(page.getByRole('link', {name: pageName}))
    return page;
  }