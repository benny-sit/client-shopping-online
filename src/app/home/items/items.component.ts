import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from '../services/api-service.service';
import { categoriesInterface, storeItemInterface } from '../types.interface';
import { Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  host: { 'class': 'wrapper'},
})
export class ItemsComponent implements OnInit, OnDestroy{

  items: storeItemInterface[] = [
    {
      id: '1',
      title: 'Milk By Tnuva',
      size: '1L',
      manufacturer: 'Tnuva',
      imgUrl: 'https://www.tnuva.co.il/uploads/f_606ee43fa87cf_1617880127.jpg',
      price: 6.15
    },
    {
      id: '1',
      title: 'Milk By Tnuva',
      size: '1L',
      manufacturer: 'Tnuva',
      imgUrl: 'https://www.tnuva.co.il/uploads/f_606ee43fa87cf_1617880127.jpg',
      price: 6.15
    },
    {
      id: '1',
      title: 'Milk By Tnuva',
      size: '1L',
      manufacturer: 'Tnuva',
      imgUrl: 'https://www.tnuva.co.il/uploads/f_606ee43fa87cf_1617880127.jpg',
      price: 6.15
    },
  ];
  
  categories: categoriesInterface[] = [];

  unsubscribe$ = new Subject<void>();

  constructor(private store: Store, private apiService: ApiService) {}

  ngOnInit(): void {
      this.apiService.getCategories().pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
        this.categories = [];
      })
  }

  categoryClicked(idx: number): void {
    
  }

  ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
  }
}
