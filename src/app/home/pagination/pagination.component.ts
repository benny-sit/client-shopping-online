import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/types.interface';
import { setPageAction } from '../store/actions';
import { selectPage } from '../store/selectors';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  host: { 'class': 'wrapper'},
})
export class PaginationComponent implements OnInit, OnDestroy {
  page: number = 0;
  
  unsubscribe$ = new Subject<void>();
  
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.store.pipe(select(selectPage), takeUntil(this.unsubscribe$)).subscribe((page: number) => this.page = page)
  }

  ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
  }

  prevPage(): void {
    if(this.page > 0) this.store.dispatch(setPageAction({page: this.page-1}));
  }

  nextPage(): void {
    this.store.dispatch(setPageAction({page: this.page+1}));
  }
}
