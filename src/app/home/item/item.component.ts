import { Component, Input, OnInit } from '@angular/core';
import { storeItemInterface } from '../types.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  host: { 'class': 'item'}
})
export class ItemComponent implements OnInit{
  @Input() itemDetails?: storeItemInterface;


  ngOnInit(): void {
      
  }

  itemClicked() {
    console.log("Clicked me!")
  }
}
