import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types.interface';
import { incCartItemAction } from '../store/actions';
import { storeItemInterface } from '../types.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  host: { 'class': 'item'}
})
export class ItemComponent implements OnInit{
  @Input() itemDetails!: storeItemInterface;


  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
  
  }

  itemClicked() {
    console.log("Clicked me!")
  }

  addItemToCart(item: storeItemInterface): void {
    this.store.dispatch(incCartItemAction({item}));
  }
}
