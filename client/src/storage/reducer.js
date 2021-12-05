import * as action_type from './actiontype';

export default function reducer(state, action) {
    switch (action.type) {
        case action_type.USER_LOGGEDIN: {
            if (state.loggedInUser.username === null) {
                //set the user data
                let newstate = {
                    ...state,
                    loggedInUser: {
                        ...state.loggedInUser,
                        username: action.payload.username,
                        password: action.payload.password,
                        usertype: action.payload.usertype
                    }
                };
                return newstate;
            }
            return state;
        }   
        case action_type.USER_LOGOUT: {
            return {
                ...state,
                loggedInUser: {
                    ...state.loggedInUser,
                    username: null,
                    password: null,
                    usertype: 1
                }
            };
        }
        case action_type.ADDTOCART: {
            return {
                ...state,
                cart: [
                    ...state.cart,
                    action.payload.item_id
                ] 
            }
         }
        default: {
            return state;
        }
    }
}