import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../types.interface";
import { loginAction, loginFailureAction, loginSuccessAction, registerAction } from "./actions";


const initialState: AuthStateInterface = {
    isSubmitting: false,
    CurrentUser: null,
    error: null,
}

const authReducer = createReducer(
    initialState,
    on(
        registerAction,
        (state): AuthStateInterface => ({
            ...state,
            isSubmitting: true
        })
    ),
    on(
        loginAction,
        (state): AuthStateInterface => ({
            ...state, 
            isSubmitting: true,
        })    
    ),
    on(
        loginSuccessAction,
        (state, action) => ({
            ...state,
            CurrentUser: action.currentUser,
            error: null,
            isSubmitting: false,
        })
    ),
    on(
        loginFailureAction,
        (state, action) => ({
            ...state,
            CurrentUser: null,
            error: action.error,
            isSubmitting: false,
        })
    )
)

export function reducers(state: AuthStateInterface, action: Action) {
    return authReducer(state, action);
}