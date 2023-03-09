import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { CurrentUserInterface } from 'src/app/auth/types.interface';
import { AppStateInterface } from 'src/app/shared/types.interface';
import { deleteItemAction, incCartItemAction, setEditItemAction } from '../store/actions';
import { storeItemInterface } from '../types.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  host: { 'class': 'item'}
})
export class ItemComponent implements OnInit{
  @Input() itemDetails!: storeItemInterface;

  currentUser$: Observable<CurrentUserInterface | null> = this.store.pipe(select(currentUserSelector))

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
  
  }

  itemClicked() {
    console.log("Clicked me!")
  }

  addItemToCart(item: storeItemInterface): void {
    this.store.dispatch(incCartItemAction({item}));
  }

  editItem(item: storeItemInterface): void {
    this.store.dispatch(setEditItemAction({item}));
  }

  removeItem(itemId: string ): void {
    this.store.dispatch(deleteItemAction({itemId}));
  }

}
