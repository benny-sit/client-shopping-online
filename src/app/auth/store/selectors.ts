import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthStateInterface } from "../types.interface";

export const authFeatureSelector = createFeatureSelector<AuthStateInterface>('auth');

export const isSubmittingSelector = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.isSubmitting
)

export const errorSelector = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.error
)

export const currentUserSelector = createSelector(
    authFeatureSelector,
    (authState: AuthStateInterface) => authState.CurrentUser
)