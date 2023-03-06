import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { registerAction } from '../store/actions';
import { errorSelector, isSubmittingSelector } from '../store/selectors';
import { registerRequestInterface } from '../types.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../auth.css']
})
export class RegisterComponent implements OnInit{
  form: FormGroup = this._formBuilder.group({
    'username': ['', Validators.required],
    'firstName': ['', Validators.required],
    'lastName': ['', Validators.required],
    'email': ['', Validators.required],
    'password': ['', Validators.required],
    'confirmPassword': ['', Validators.required],
  });
  formAdditional: FormGroup = this._formBuilder.group({
    'city': ['', Validators.required],
    'street': ['', Validators.required],
    'IdNumber': ['', Validators.required],
  });;
  
  error$: Observable<string> = this.store.pipe(select(errorSelector), map((error: any) => error?.message || ''))
  isSubmitting$: Observable<boolean> = this.store.pipe(select(isSubmittingSelector));


  constructor(private _formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    
  }


  register(): void {

    const request: registerRequestInterface = {
      username: this.form.value.username,
      password: this.form.value.password,
      userDetails: {
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        idNumber: this.formAdditional.value.IdNumber,
        address: {
          city: this.formAdditional.value.city,
          street: this.formAdditional.value.street,
        }
      }
    }

    this.store.dispatch(registerAction({request}));
  }
}
