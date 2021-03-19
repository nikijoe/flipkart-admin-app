import { orderConstants } from "../actions/constants"

const initState = {
    orders: [],
    loading: true,
    error: null
}

export default function orderReducer(state=initState, action) {
    switch(action.type){
        case orderConstants.GET_CUSTOMER_ORDER_REQUEST:
            state={
                ...state,
                loading: true,
                error: null
            }
            break
        case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
        case orderConstants.GET_ALL_ORDERS_SUCCESS:
            state={
                ...state,
                orders: action.payload.orders,
                loading: false,
                error: null
            }
            break
        case orderConstants.GET_CUSTOMER_ORDER_FAILURE:
            state={
                ...state,
                loading: false,
                error: action.payload.error
            }
            break
        default:
            break
    }
    return state
}