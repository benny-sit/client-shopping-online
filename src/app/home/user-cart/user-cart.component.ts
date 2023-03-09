import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil} from 'rxjs'
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { CurrentUserInterface } from 'src/app/auth/types.interface';
import { AppStateInterface } from 'src/app/shared/types.interface';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { changeCartItemAction, clearCartAction, createItemAction, createOrderAction, decCartItemAction, incCartItemAction, loadCartItemsAction, loadCartPriceAction, setEditItemAction, updateItemAction } from '../store/actions';
import { selectCartItems, selectCartPrice, selectEditItem } from '../store/selectors';
import { cartItemInterface, storeItemInterface } from '../types.interface';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css'],
  host: { 'class': 'wrapper'}
})
export class UserCartComponent implements OnInit, OnDestroy{
  unsubscribe$ = new Subject<void>();

  form: FormGroup = this._formBuilder.group({
    'title': ['', Validators.required],
    'manufacturer': ['', Validators.required],
    'size': ['', Validators.required],
    'price': ['', Validators.required],
    'imgUrl': ['', Validators.required],
    '_id': ['', Validators.required],
    'category': ['', Validators.required],
  });;

  editItem$: Observable<storeItemInterface | null> =  this.store.pipe(select(selectEditItem), takeUntil(this.unsubscribe$))

  editItem: storeItemInterface | null = null;

  currentUser$: Observable<CurrentUserInterface | null> = this.store.pipe(select(currentUserSelector))

  cartPrice$: Observable<number> = this.store.pipe(select(selectCartPrice))

  cartItems$: Observable<cartItemInterface[]> = this.store.pipe(select(selectCartItems))

  constructor(private store: Store<AppStateInterface>, private dialog: MatDialog, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
      this.store.dispatch(loadCartPriceAction({}));
      this.store.dispatch(loadCartItemsAction({}));

      this.editItem$.subscribe(data => {
        this.editItem = data;
        if(this.editItem === null) {
          this.form = this._formBuilder.group({
            'title': ['', Validators.required],
            'manufacturer': ['', Validators.required],
            'size': ['', Validators.required],
            'price': ['', Validators.required],
            'imgUrl': ['', Validators.required],
            '_id': ['', Validators.required],
            'category': ['', Validators.required],
          });
        } else {
          this.form = this._formBuilder.group({
            'title': [this.editItem.title, Validators.required],
            'manufacturer': [this.editItem.manufacturer, Validators.required],
            'size': [this.editItem.size, Validators.required],
            'price': [this.editItem.price, Validators.required],
            'imgUrl': [this.editItem.imgUrl, Validators.required],
            '_id': [this.editItem._id, Validators.required],
            'category': [this.editItem.category, Validators.required],
          });
        }
      })

  }

  isEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
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

  openOrderDialog(): void {
    const dialogRef = this.dialog.open(OrderDialogComponent)

    dialogRef.afterClosed().subscribe((res) => {
      if (!res) return;
      this.store.dispatch(createOrderAction({last4digits: res}))
    })
  }

  // Admin
  onSubmit(): void {
    if(this.editItem) {
      this.store.dispatch(updateItemAction({item: this.form.value}))
    } else {
      this.store.dispatch(createItemAction({item: this.form.value}))
    }
  }

  createNew(): void {
    this.store.dispatch(setEditItemAction({item: null}))
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
