import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable} from 'rxjs'
import { AppStateInterface } from 'src/app/shared/types.interface';
import { changeCartItemAction, clearCartAction, decCartItemAction, incCartItemAction, loadCartItemsAction, loadCartPriceAction } from '../store/actions';
import { selectCartItems, selectCartPrice } from '../store/selectors';
import { cartItemInterface, storeItemInterface } from '../types.interface';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css'],
  host: { 'class': 'wrapper'}
})
export class UserCartComponent implements OnInit{

  cartPrice$: Observable<number> = this.store.pipe(select(selectCartPrice))

  cartItems$: Observable<cartItemInterface[]> = this.store.pipe(select(selectCartItems))

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
      this.store.dispatch(loadCartPriceAction({}));
      this.store.dispatch(loadCartItemsAction({}));
  }

  incCartItem(item: storeItemInterface): void {
    this.store.dispatch(incCartItemAction({item: item}));
  }

  decCartItem(item: storeItemInterface): void {
    this.store.dispatch(decCartItemAction({item: item}));
  }

  changeCartItem(item: storeItemInterface, event: any): void {
    this.store.dispatch(changeCartItemAction({item: item, quantity: +event.target.value}));
  }

  clearCart(): void {
    this.store.dispatch(clearCartAction({}));
  }
}
