import { createAction, props } from "@ngrx/store";
import { categoriesInterface } from "src/app/home/types.interface";

export const categorySelectAction = createAction(
    '[Home] category select',
    props<{category: categoriesInterface}>()
)

export const getItemsAction = createAction(
    '[Home] getItems',
    props<{page: number, search: string, categoryId: string}>()
)