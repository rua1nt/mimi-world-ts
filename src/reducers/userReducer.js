import Cookies from "js-cookie";
import { USER_LOGIN, USER_LOGOUT, USER_VERIFY } from "./actionTypes";

export function userReducer(
    state = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    action
) {
    switch (action.type) {
        case USER_LOGIN:
            return action.payload;
        case USER_LOGOUT:
            return null;
        case USER_VERIFY:
            return { ...state, verified: action.payload };
        default:
            return state;
    }
}
