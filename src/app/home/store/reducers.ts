import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { ApiStateInterface, cartItemInterface } from "../types.interface";
import { changeCartItemAction, clearCartAction, createItemAction, createOrderAction, decCartItemAction, deleteItemAction, fetchFailureAction, incCartItemAction, loadCartItemsAction, loadCartItemsSuccessAction, loadCartPriceAction, loadCartPriceSuccessAction, loadCategoriesAction, loadCategoriesSuccessAction, loadItemsAction, loadItemsSuccessAction, selectedCategoryAction, setEditItemAction, setPageAction, setSearchAction, updateItemAction } from "./actions";



const initialState: ApiStateInterface = {
    items: [],
    cartItems: [],
    categories: [],
    selectedCategory: null,
    page: 0,
    search: '',
    isFetching: false,
    cartPrice: 0,
    editItem: null,
}



export const apiReducer = createReducer(
    initialState,
    on(
        fetchFailureAction,
        (state) => ({...state, isFetching: false})
    ),
    // Categories
    on(
        loadCategoriesAction,
        (state): ApiStateInterface => ({
            ...state,
            isFetching: true,
        })
    ),
    on(
        loadCategoriesSuccessAction,
        (state, action): ApiStateInterface => ({
            ...state,
            categories: action.categories,
            isFetching: false,
        })
    ),
    // Cart
    on(
        loadCartPriceAction,
        (state): ApiStateInterface => ({
            ...state,
            isFetching: true,
        })
    ),
    on(
        loadCartPriceSuccessAction,
        (state, action): ApiStateInterface => ({
            ...state,
            cartPrice: action.price
        })
    ),
    on(
        loadCartItemsAction,
        (state): ApiStateInterface => ({
            ...state,
            isFetching: true
        })
    ),
    on(
        loadCartItemsSuccessAction,
        (state, action): ApiStateInterface => ({
            ...state, cartItems: action.cartItems, isFetching: false
        })
    ),
    on(
        incCartItemAction,
        (state, action): ApiStateInterface => {
            if(state.cartItems.find(c => c.item._id === action.item._id)) {
                const cartItems = state.cartItems.map((c) => {
                    if (c.item._id !== action.item._id) return c;
                    const cartItem: cartItemInterface = {item: c.item, quantity: c.quantity+1}
                    return cartItem;
                })
                return {...state, cartItems}
            }

            return {...state, cartItems: [...state.cartItems, {item: action.item, quantity: 1}]}
        }
    ),
    on(
        decCartItemAction,
        (state, action): ApiStateInterface => {
            if(state.cartItems.find(c => c.item._id === action.item._id)) {
                const cartItems = state.cartItems.map((c) => {
                    if (c.item._id !== action.item._id) return c;
                    const cartItem: cartItemInterface = {item: c.item, quantity: Math.max(c.quantity-1, 0)}
                    return cartItem;
                })
                return {...state, cartItems}
            }

            return {...state}
        }
    ),
    on(
        changeCartItemAction,
        (state, action): ApiStateInterface => {
            if(state.cartItems.find(c => c.item._id === action.item._id)) {
                const cartItems = state.cartItems.map((c) => {
                    if (c.item._id !== action.item._id) return c;
                    const cartItem: cartItemInterface = {item: c.item, quantity: Math.max(action.quantity, 0)}
                    return cartItem;
                })
                return {...state, cartItems}
            }

            return {...state, cartItems: [...state.cartItems, {item: action.item, quantity: 1}]}
        }
    ),
    on(
        clearCartAction,
        (state) => ({...state, cartItems: []})
    ),
    // Query Filters
    on(
        selectedCategoryAction,
        (state, action): ApiStateInterface => {
            if (action.category == state.selectedCategory) {
                return {...state, selectedCategory: null}
            }
            return {...state, selectedCategory: action.category}
        }
    ),
    on(
        setSearchAction,
        (state, action): ApiStateInterface => {
            return {...state, search: action.search}
        }
    ),
    on(
        setPageAction,
        (state, action): ApiStateInterface => {
            return {...state, page: action.page}
        }
    ),
    // Items
    on(
        loadItemsAction,
        (state): ApiStateInterface => {
            return {...state, isFetching: true}
        }
    ),
    on(
        loadItemsSuccessAction,
        (state, action): ApiStateInterface => {
            return {...state, isFetching: false, items: action.items}
        }
    ),
    // Items | Admin 
    on(
        createItemAction,
        (state, action): ApiStateInterface => {
            return {...state, isFetching: true, editItem: null}
        }
    ),
    on(
        updateItemAction,
        (state, action): ApiStateInterface => {
            return {...state, isFetching: true, editItem: null}
        }
    ),
    on(
        deleteItemAction,
        (state): ApiStateInterface => {
            return {...state, isFetching: true}
        }
    ),
    on(
        setEditItemAction,
        (state, action): ApiStateInterface => {
            return {...state, editItem: action.item}
        }
    ),
    // Orders
    on(
        createOrderAction,
        (state, action): ApiStateInterface => {
            return {...state, isFetching: true}
        }
    )
)


// export function apiReducers(state: ApiStateInterface, action: Action) {
//     return apiReducer(state, action);
// }