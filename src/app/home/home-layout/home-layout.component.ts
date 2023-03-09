import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { refreshAction } from 'src/app/auth/store/actions';
import { AppStateInterface } from 'src/app/shared/types.interface';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit{

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
      this.store.dispatch(refreshAction({}));
  }
}
