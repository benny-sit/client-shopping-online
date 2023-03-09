import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError, tap } from 'rxjs/operators'
import { of} from 'rxjs'

import { AuthService } from "../auth-service.service";
import { CurrentUserInterface } from "../types.interface";
import { loginAction, loginFailureAction, loginSuccessAction, refreshAction, registerAction } from "./actions";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable()
export class AuthEffect {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginAction),
            switchMap(({request}) => {
                return this.authService.login(request).pipe(
                    map((currentUser: CurrentUserInterface) => { 
                        window.localStorage.setItem('accessToken', currentUser.token);
                        return loginSuccessAction({currentUser}) 
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(loginFailureAction(errorResponse.error))
                    })
                )
            })
        )
    )

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(registerAction),
            switchMap(({request}) => {
                return this.authService.register(request).pipe(
                    map((currentUser: CurrentUserInterface) => { 
                        window.localStorage.setItem('accessToken', currentUser.token);
                        return loginSuccessAction({currentUser}) 
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(loginFailureAction(errorResponse.error))
                    })
                )
            })
        )
    )

    refresh$ = createEffect(() => 
        this.actions$.pipe(
            ofType(refreshAction),
            switchMap(() => {
                return this.authService.refresh().pipe(
                    map((currentUser: CurrentUserInterface) => { 
                        if(currentUser) window.localStorage.setItem('accessToken', currentUser.token);
                        return loginSuccessAction({currentUser}) 
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(loginFailureAction(errorResponse.error))
                    })
                )
            })
        )
    )

    redirectAfterSubmit$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loginSuccessAction),
            tap(() => {
                this.router.navigateByUrl('/');
            })   
        ),
        {dispatch: false}
    )

    constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}