import { useDispatch } from "react-redux";
import { TheMoon, TheSun } from "../../svg";

export default function DarkModeToggler({ darkTheme }) {
    const dispatch = useDispatch();

    const darkThemeToggler = () => {
        if (darkTheme) {
            localStorage.setItem("darkTheme", false);
            dispatch({ type: "LIGHT" });
        } else {
            localStorage.setItem("darkTheme", true);
            dispatch({ type: "DARK" });
        }
    };

    return (
        <div className="darkmode__toggler">
            <input className="darkmode__input" type="checkbox" id="darkmode-toggle" />
            <label className="darkmode__label" htmlFor="darkmode-toggle" onClick={darkThemeToggler}>
                <TheSun className="darkmode__sunlight" />
                <TheMoon className="darkmode__moonlight" />
            </label>
        </div>
    );
}
