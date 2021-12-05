import { createStore } from 'redux';
import reducer from './reducer';

//creating the store using the given reducer function
let initialuserStore = {
    loggedInUser: {
        username: null,
        password: null,
        usertype: 1
    },
    cart: []
};

//retrieve the user from the local storage
const user = JSON.parse(window.localStorage.getItem("user"));

//if its available then set it
if (user) {
    initialuserStore = {
        ...initialuserStore,
        loggedInUser: 
        {
            ...initialuserStore.loggedInUser,
            username: user.username,
            password: user.password,
            usertype: user.usertype
        }
    };
}

//create the global storage
export const userStore = createStore(
    reducer,
    initialuserStore,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);