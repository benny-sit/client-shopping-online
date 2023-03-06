import { createAction, props } from "@ngrx/store";
import { CurrentUserInterface, loginRequestInterface, registerRequestInterface } from "../types.interface";

export const loginAction = createAction(
    '[Auth] login',
    props<{request: loginRequestInterface}>()
)

export const loginSuccessAction = createAction(
    '[Auth] loginSuccess',
    props<{currentUser: CurrentUserInterface}>()
)

export const loginFailureAction = createAction(
    '[Auth] loginFailure',
    props<{error: {message: string}}>()
)

export const registerAction = createAction(
    '[Auth] register',
    props<{request: registerRequestInterface}>()
)

export const registerSuccessAction = createAction(
    `[Auth] registerSuccess`,
    props<{currentUser: CurrentUserInterface}>()
)

export const registerFailureAction = createAction(
    `[Auth] registerFailure`,
    props<{error: {message: string}}>()
)