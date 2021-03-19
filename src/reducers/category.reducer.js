import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: null
}

// const buildNewCategories= (categories, category) => {
//         if (!category.parentId){
//             category.children = [];
//             return categories.concat(category)
//         }
//     return categories.map((cate) => {
//       if (cate._id === category.parentID) {
//         category.children = [];
//         cate.children.push(category);
//       }
//       if (cate.children && cate.children.length > 0)
//         buildNewCategories(cate.children, category);
//       return cate;
//     });
//   };

const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];

    if(parentId === undefined){
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type:category.type,
                children: []
            }
        ];
    }
    
    for(let cat of categories){

        if(cat._id === parentId){
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type:category.type,
                parentId: category.parentId,
                children: []
            }
            myCategories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            });
        }else{
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            });
        }
    }
    return myCategories;
}


export default function categoryReducer(state = initState, action) {
    switch(action.type){
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true,
                error: null
            }
            break
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories,
                loading: false,
                error: null
            }
            break
        case categoryConstants.GET_ALL_CATEGORIES_ERROR:
            state = {
                ...state,
                categories: [],
                loading: false,
                error: action.payload.error
            }
            break
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
                error: null
            }
            break
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category
            const updatedCategories = buildNewCategories(category.parentId, state.categories, 
                category)
            // const updatedCategories = buildNewCategories(state.categories, 
            //     category)
            state = {
                ...state,
                categories: updatedCategories,
                loading: false,
                error: null
            }
            break
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break
        case categoryConstants.UPDATE_CATEGORIES_REQUEST:
            state={
                ...state,
                loading: true,
                error: null
            }
            break
        case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
            state={
                ...state,
                loading: false,
                error: null
            }
            break
        case categoryConstants.UPDATE_CATEGORIES_FAILURE:
            state={
                ...state,
                loading: false,
                error: action.payload.error
            }
            break
        case categoryConstants.DELETE_CATEGORIES_REQUEST:
            state={
                ...state,
                loading: true,
                error: null
            }
            break
        case categoryConstants.DELETE_CATEGORIES_SUCCESS:
            state={
                ...state,
                loading: false,
                error: null
            }
            break
        case categoryConstants.DELETE_CATEGORIES_FAILURE:
            state={
                ...state,
                loading: false,
                error: action.payload.error
            }
            break
        default:
            // state = {
            //     ...state
            // }
            break
    }
    return state
}