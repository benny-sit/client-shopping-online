import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError, tap, withLatestFrom, distinctUntilChanged, debounceTime } from 'rxjs/operators'
import { of} from 'rxjs'
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../services/api-service.service";
import { changeCartItemAction, clearCartAction, decCartItemAction, fetchFailureAction, incCartItemAction, loadCartItemsAction, loadCartItemsSuccessAction, loadCartPriceAction, loadCartPriceSuccessAction, loadCategoriesAction, loadCategoriesSuccessAction, loadItemsAction, loadItemsSuccessAction, selectedCategoryAction, setPageAction, setSearchAction } from "./actions";
import { cartItemInterface, categoriesInterface, storeItemInterface } from "../types.interface";
import { Store, Action } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types.interface";


@Injectable()
export class ApiEffect {
    categories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCategoriesAction),
            switchMap(() => {
                return this.apiService.getCategories().pipe(
                    map((categories: categoriesInterface[]) => {
                        return loadCategoriesSuccessAction({categories})
                    })
                )
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(fetchFailureAction({error: errorResponse}))
            })
        )    
    )

    items$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadItemsAction),
            withLatestFrom(this.store$),
            switchMap(([action, storeState]) => {
                const page = storeState.api.page || 0;
                const search = storeState.api.search || '';
                const categoryId = storeState.api.selectedCategory?._id ? storeState.api.selectedCategory._id : '';
                return this.apiService.getItems(search, categoryId, page).pipe(
                    map((items: storeItemInterface[]) => {
                        return loadItemsSuccessAction({items})
                    })
                )
            }),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(fetchFailureAction({error: errorResponse}))
            })
        )
    )

    queryChange$ = createEffect(() => 
        this.actions$.pipe(
            ofType(setPageAction, selectedCategoryAction, setSearchAction),
            distinctUntilChanged(),
            debounceTime(500),
            switchMap(() => 
                of(
                    loadItemsAction({}),
                )
            ),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(fetchFailureAction({error: errorResponse}))
            })
        )
    )

    cartItems$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadCartItemsAction),
            switchMap(() => 
                this.apiService.getCartItems().pipe(
                    map((cartObject: {cartItems: cartItemInterface[]}) => {
                        return loadCartItemsSuccessAction(cartObject)
                    })
                )
            ),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(fetchFailureAction({error: errorResponse}))
            })
        )
    )



    redirectOnFailure$ = createEffect(() => 
        this.actions$.pipe(
            ofType(fetchFailureAction),
            tap(() => this.router.navigateByUrl('/login'))
        ),
        { dispatch: false}
    )

    incCartItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(incCartItemAction),
            switchMap(({item}) => 
                this.apiService.incCartItem(item._id).pipe(
                    map((cartObject: {cartItems: cartItemInterface[]}) => {
                        return loadCartItemsSuccessAction(cartObject)
                    })
                )
            ),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(fetchFailureAction({error: errorResponse}))
            }) 
        )
    )

    decCartItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(decCartItemAction),
            switchMap(({item}) => 
                this.apiService.decCartItem(item._id).pipe(
                    map((cartObject: {cartItems: cartItemInterface[]}) => {
                        return loadCartItemsSuccessAction(cartObject)
                    })
                )
            ),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(fetchFailureAction({error: errorResponse}))
            }) 
        )
    )

    changeCartItem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(changeCartItemAction),
            switchMap(({item, quantity}) => 
                this.apiService.changeCartItem(item._id, quantity).pipe(
                    map((cartObject: {cartItems: cartItemInterface[]}) => {
                        return loadCartItemsSuccessAction(cartObject)
                    })
                )
            ),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(fetchFailureAction({error: errorResponse}))
            }) 
        )
    )

    clearCart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(clearCartAction),
            switchMap(() => 
                this.apiService.clearCart().pipe(
                    map((cartObject: {cartItems: cartItemInterface[]}) => {
                        return loadCartItemsSuccessAction(cartObject)
                    })
                )
            ),
            catchError((errorResponse: HttpErrorResponse) => {
                return of(fetchFailureAction({error: errorResponse}))
            }) 
         )
    )

    cartPrice$ = createEffect(() => 
    this.actions$.pipe(
        ofType(loadCartPriceAction, loadCartItemsSuccessAction),
        switchMap(() => 
            this.apiService.getCartPrice().pipe(
                map(res => {
                    return loadCartPriceSuccessAction({price: res.total})
                })
            )
        ),
        catchError((errorResponse: HttpErrorResponse) => {
            return of(fetchFailureAction({error: errorResponse}))
        })
        )
    )

    constructor(private actions$: Actions, private router: Router, private apiService: ApiService, private store$: Store<AppStateInterface>) {}
}