import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { refreshAction } from '../store/actions';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
  host: {'class': 'wrapper'},
})
export class AuthLayoutComponent implements OnInit {

  constructor(private store: Store) {}

  ngOnInit(): void {
      this.store.dispatch(refreshAction({}))
  }
}
