const initiailState = {
    loading: false,
    cartItems: [],
}

export const rootReducer = (state = initiailState, action) => {


    switch (action.type) {

        case "addToCart":
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload],
            };

        case "updateCart":
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item._id === action.payload._id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            };

        case "deleteFromCart":
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item._id !== action.payload._id),
            };

        case "removeAllData":
            return {
                ...state,
                cartItems:[]
            }


        case "showLoading":
            return {
                ...state,
                loading: true
            }

        case "hideLoading":
            return {
                ...state,
                loading: false
            }

        default: return state

    }
}