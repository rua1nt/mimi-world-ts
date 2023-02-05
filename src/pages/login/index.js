import { useState } from "react";
import LoginForm from "../../comps/login/LoginForm";
import RegisterForm from "../../comps/login/RegisterForm";
import Footer from "../../comps/login/Footer";
import "./style.css";

export default function Login() {
    const [visible, setVisible] = useState(false);

    return (
        <div className="login">
            <div className="login_wrapper">
                <LoginForm setVisible={setVisible} />
                {visible && <RegisterForm setVisible={setVisible} />}
                <Footer />
            </div>
        </div>
    );
}
