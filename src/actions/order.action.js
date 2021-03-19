import axios from "../helpers/axios"
import { orderConstants } from "./constants"

export const updateOrder = (payload) => {
    return async dispatch => {
        dispatch({type: orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST})
        try {
            const res = await axios.post('/order/update', payload)
            console.log(res)
            if(res.status === 200){
                dispatch({type: orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS})
                dispatch(getCustomerOrders())
            } else {
                dispatch({type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE, payload: {
                    error: res.data.error
                }})
            }
        } catch (error) {
            dispatch({type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE, payload: {
                error
            }})
            console.log(error)
        }
    }
}

const getCustomerOrders = () => {
    return async dispatch => {
        dispatch({type: orderConstants.GET_CUSTOMER_ORDER_REQUEST})
        try {
            const res = await axios.post('/order/getCustomerOrders')
            console.log(res)
            if(res.status === 200){
                dispatch({type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS, payload: {
                    orders: res.data.orders}})
            } else {
                dispatch({type: orderConstants.GET_CUSTOMER_ORDER_FAILURE, payload: {
                    error: res.data.error
                }})
            }
        } catch (error) {
            dispatch({type: orderConstants.GET_CUSTOMER_ORDER_FAILURE, payload: {
                error
            }})
            console.log(error)
        }
    }
}

export {
    getCustomerOrders,
}