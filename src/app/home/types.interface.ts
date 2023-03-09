

export interface categoriesInterface {
    _id: string;
    name: string;
    __v: string;
}

export interface storeItemInterface {
    _id: string;
    title: string;
    manufacturer: string;
    size: string;
    price: number;
    imgUrl: string;
    category: string;
}


export interface cartItemInterface {
    item: storeItemInterface;
    quantity: number;
}

export interface ApiStateInterface {
    items: storeItemInterface[];
    cartItems: cartItemInterface[];
    categories: categoriesInterface[];
    selectedCategory: categoriesInterface | null;
    page: number;
    search: string;
    isFetching: boolean;
    cartPrice: number;
    editItem: storeItemInterface | null;
}