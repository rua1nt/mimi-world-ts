// import Cookies from "js-cookie";

export function themeReducer(
    // state = Cookies.get("darkTheme") ? JSON.parse(Cookies.get("darkTheme")) : false,
    state = localStorage.getItem("darkTheme")
        ? JSON.parse(localStorage.getItem("darkTheme"))
        : false,
    action
) {
    switch (action.type) {
        case "DARK":
            return true;
        case "LIGHT":
            return false;
        default:
            return state;
    }
}
