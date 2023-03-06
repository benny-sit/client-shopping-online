import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service.service';
import { loginAction } from '../store/actions';
import { errorSelector, isSubmittingSelector } from '../store/selectors';
import { loginRequestInterface } from '../types.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.css']
})
export class LoginComponent implements OnInit{
  form!: FormGroup;
  isSubmitting$: Observable<boolean> = this.store.pipe(select(isSubmittingSelector));
  error$: Observable<{message: string} | null> = this.store.pipe(select(errorSelector));

  hidePassword = false;

  constructor(private _formBuilder: FormBuilder, private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeForm();  
  }

  initializeForm(): void {
    this.form = this._formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  onSubmit(): void {
    const request: loginRequestInterface = {
      username: this.form.value.username,
      password: this.form.value.password
    }
    this.store.dispatch(loginAction({request}))
  }
}
