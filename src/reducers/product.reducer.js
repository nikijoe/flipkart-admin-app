import { productConstants } from "../actions/constants";

const initState = {
    product: {},
    loading: false,
    error: null
}
export default function productReducer(state=initState, action) {
    switch(action.type){
        case productConstants.ADD_NEW_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true,
                error: null
            }
            break
        case productConstants.ADD_NEW_PRODUCT_SUCCESS:
            state = {
                product: action.payload,
                loading: false,
                error: null
            }
            break
        case productConstants.ADD_NEW_PRODUCT_FAILURE:
            state = {
                ...state,
                product: {},
                loading: false,
                error: action.payload.error
            }
            break
        default:
            // state ={
            //     ...state
            // }
            break
    } 
    return state
}