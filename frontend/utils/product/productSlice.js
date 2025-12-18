import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    product: {}, // 1. (중요) {} 대신 null로 초기화
    storeList: []
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        createProduct(state, action) {
            const { products } = action.payload;
            state.products = products;
        },

        setProduct(state, action) {
            state.product = action.payload;
        },

        filterProduct(state, action) {
            const { pid } = action.payload;
            state.product = state.products.find(item=> item.pid === pid);
        },
        setStoreList(state, action) {
            state.storeList = action.payload;
        }
    },
})

export const { createProduct, setProduct, filterProduct,setStoreList } = productSlice.actions

export default productSlice.reducer