import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ApiService } from '../services/api-service.service';
import { categoriesInterface, storeItemInterface } from '../types.interface';
import { map, Observable, Subject, takeUntil} from 'rxjs';
import { incCartItemAction, loadCategoriesAction, loadItemsAction, selectedCategoryAction } from '../store/actions';
import { selectCategories, selectItems } from '../store/selectors';
import { AppStateInterface } from 'src/app/shared/types.interface';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  host: { 'class': 'wrapper'},
})
export class ItemsComponent implements OnInit, OnDestroy{

  items$: Observable<storeItemInterface[]> = this.store.pipe(select(selectItems))
  
  // [
  //   {
  //     _id: '1',
  //     title: 'Milk By Tnuva',
  //     size: '1L',
  //     manufacturer: 'Tnuva',
  //     imgUrl: 'https://www.tnuva.co.il/uploads/f_606ee43fa87cf_1617880127.jpg',
  //     price: 6.15
  //   },
  //   {
  //     _id: '1',
  //     title: 'Milk By Tnuva',
  //     size: '1L',
  //     manufacturer: 'Tnuva',
  //     imgUrl: 'https://www.tnuva.co.il/uploads/f_606ee43fa87cf_1617880127.jpg',
  //     price: 6.15
  //   },
  //   {
  //     _id: '1',
  //     title: 'Milk By Tnuva',
  //     size: '1L',
  //     manufacturer: 'Tnuva',
  //     imgUrl: 'https://www.tnuva.co.il/uploads/f_606ee43fa87cf_1617880127.jpg',
  //     price: 6.15
  //   },
  // ];

  selectedCategory: categoriesInterface = {
    _id:'',
    name: '',
    __v: '',
  };
  
  categories$: Observable<categoriesInterface[]> = this.store.pipe(select(selectCategories));

  unsubscribe$ = new Subject<void>();

  constructor(private store: Store<AppStateInterface>, private apiService: ApiService) {}

  ngOnInit(): void {
    this.store.dispatch(loadCategoriesAction({}))
    this.store.dispatch(loadItemsAction({}));
  }

  categoryClicked(c: categoriesInterface): void {
    this.selectedCategory = this.selectedCategory == c ? {_id: '', name: '', __v: '0'} : c;
    this.store.dispatch(selectedCategoryAction({category: c}))
  }

  ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
  }


}
