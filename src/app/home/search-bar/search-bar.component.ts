import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types.interface';
import { setSearchAction } from '../store/actions';
import { Observable} from 'rxjs'
import { selectIsFetching } from '../store/selectors';
import { debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  host: { 'class': 'wrapper'},
})
export class SearchBarComponent implements OnInit {
  search = '';

  isFetching$: Observable<boolean> = this.store.pipe(select(selectIsFetching), debounceTime(300))

  ngOnInit(): void {
      
  }

  constructor(private store: Store<AppStateInterface>) {}

  onChange(search: string): void {
    this.search = search;
    this.store.dispatch(setSearchAction({search: search}));
  }
}
