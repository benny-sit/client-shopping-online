import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { AppStateInterface } from 'src/app/shared/types.interface';
import { Observable} from 'rxjs';
import { CurrentUserInterface } from 'src/app/auth/types.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentUser$: Observable<CurrentUserInterface | null>  = this.store.pipe(select(currentUserSelector))

  constructor(private store: Store<AppStateInterface>){}
}
