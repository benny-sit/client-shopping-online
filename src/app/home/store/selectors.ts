import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/types.interface";
import { ApiStateInterface, categoriesInterface } from "../types.interface";


const selectApiData = (state: AppStateInterface) => state.api;

export const selectCategories = createSelector(
    selectApiData,
    (state: ApiStateInterface) => state.categories
)

export const selectSearch = createSelector(
    selectApiData,
    (state: ApiStateInterface) => state.search
)

export const selectItems = createSelector(
    selectApiData,
    (state: ApiStateInterface) => state.items
)

export const selectCartItems = createSelector(
    selectApiData,
    (state: ApiStateInterface) => state.cartItems
)

export const selectCartPrice = createSelector(
    selectApiData,
    (state: ApiStateInterface) => state.cartPrice
)

export const selectSelectedCategory = createSelector(
    selectApiData,
    (state: ApiStateInterface) => state.selectedCategory
)

export const selectIsFetching = createSelector(
    selectApiData,
    (state: ApiStateInterface) => state.isFetching
)

export const selectPage = createSelector(
    selectApiData,
    (state: ApiStateInterface) => state.page
)