import { productConstants } from "../actions/constants";

const initState = {
    products: [],
    loading: false,
    error: null
}

export default function productsReducer(state=initState, action) {
    switch (action.type){
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                loading: false,
                error: null
            }
            break
        default: 
            // state = {...state}
            break
    }
    return state
}
