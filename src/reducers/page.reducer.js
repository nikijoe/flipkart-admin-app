import { pageConstants } from "../actions/constants"

const initState = {
    error: null,
    loading: false,
    page: {}
}

export default function pageReducer (state=initState, action) {
    switch(action.type){
        case pageConstants.CREATE_PAGE_REQUEST:
            state={
                ...state,
                error: null,
                loading: true
            }
            break
        case pageConstants.CREATE_PAGE_SUCCESS:
            state={
                ...state,
                page: action.payload.page,
                error: null,
                loading: false
            }
            break
        case pageConstants.CREATE_PAGE_FAILURE:
            state={
                ...state,
                error: action.payload.error,
                loading: false
            }
            break
        default:
            break
    }
    return state
}