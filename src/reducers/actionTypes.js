// User
export const USER_LOGIN = "LOGIN";
export const USER_LOGOUT = "LOGOUT";
export const USER_VERIFY = "VERIFY";

export function test_USER_LOGIN(user) {
    console.log("test_USER_LOGIN");
    const action = { type: USER_LOGIN, payload: user };
    return action;
}
