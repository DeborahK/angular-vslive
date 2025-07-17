import { Component } from '@angular/core';

import { CartList } from "../cart-list/cart-list";
import { CartTotal } from "../cart-total/cart-total";

@Component({
    imports: [CartList, CartTotal],
    template: `
    <div class='row'>
      <sw-cart-list/>
    </div>
    <div class='row'>
      <div class='offset-md-6 col-md-6'>
        <sw-cart-total/>
      </div>
    </div>
  `
})
export class CartShell {

}
