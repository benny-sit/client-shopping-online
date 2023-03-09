import { createAction, props } from "@ngrx/store";
import { cartItemInterface, categoriesInterface, storeItemInterface } from "src/app/home/types.interface";


export const fetchFailureAction = createAction(
    '[Home] fetchFailure',
    props<{error: any}>()
)

export const setSearchAction = createAction(
    '[Home] setSearch',
    props<{search: string}>()
)
    
export const setPageAction = createAction(
    '[Home] setPage',
    props<{page: number}>()
)

// Cart

export const loadCartPriceAction = createAction(
    '[Home] loadCartPrice',
    props<any>()
)

export const loadCartPriceSuccessAction = createAction(
    '[Home] loadCartPriceSuccess',
    props<{price: number}>()
)

export const loadCartItemsAction = createAction(
    '[Home] loadCartItems',
    props<any>()
)

export const loadCartItemsSuccessAction = createAction(
    '[Home] loadCartItemsSuccess',
    props<{cartItems: cartItemInterface[]}>()
)


export const incCartItemAction = createAction(
    '[Home] incCartItem',
    props<{item: storeItemInterface}>()
)

export const decCartItemAction = createAction(
    '[Home] decCartItem',
    props<{item: storeItemInterface}>()
)

export const changeCartItemAction = createAction(
    '[Home] changeCartItem',
    props<{item: storeItemInterface, quantity: number}>()
)

export const clearCartAction = createAction(
    '[Home] clearCart',
    props<any>()
)

// Categories
            
export const selectedCategoryAction = createAction(
    '[Home] category select',
    props<{category: categoriesInterface | null}>()
)
            
export const loadCategoriesAction = createAction(
    '[Home] loadCategory',
    props<any>()
)

export const loadCategoriesSuccessAction = createAction(
    '[Home] loadCategoriesSuccess',
    props<{categories: categoriesInterface[]}>()
)

// Items

export const loadItemsAction = createAction(
    '[Home] loadItems',
    props<any>()
)

export const loadItemsSuccessAction = createAction(
    '[Home] loadItemsSuccess',
    props<{items: storeItemInterface[]}>()
)

// Items | ADMIN

export const createItemAction = createAction(
    '[Home] createItem',
    props<{item: storeItemInterface}>()
)

export const updateItemAction = createAction(
    '[Home] updateItem',
    props<{item: storeItemInterface}>()
)

export const deleteItemAction = createAction(
    '[Home] deleteItem',
    props<{itemId: string}>()
)

export const setEditItemAction = createAction(
    '[Home] setEditItem',
    props<{item: storeItemInterface | null}>()
)

// Orders 

export const createOrderAction = createAction(
    '[Home] createOrder',
    props<{last4digits: string}>()
)