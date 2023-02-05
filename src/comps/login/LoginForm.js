import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import DotLoader from "react-spinners/DotLoader";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import LoginInput from "../../comps/inputs/loginInput";

const loginInfos = {
    email: "",
    password: "",
};

export default function LoginForm({ setVisible }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, setLogin] = useState(loginInfos);
    const { email, password } = login;

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };

    const loginValidation = Yup.object({
        email: Yup.string()
            .required("Email address is required.")
            .email("Must be a valid email.")
            .max(100),
        password: Yup.string().required("Password is required"),
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const loginSubmit = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/login`,
                { email, password }
            );
            dispatch({ type: "LOGIN", payload: data });
            Cookies.set("user", JSON.stringify(data));
            navigate("/");
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };

    useEffect(() => {
        toast("🦄 Welcome to Mi-book", {
            position: "top-left",
            autoClose: 15000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }, []);

    return (
        <div className="login_wrap">
            <div className="login_1">
                <span>MiBook Special Edition 🚀</span>
                <img src="../../icons/facebook.svg" alt="" />
                <span>
                    Mi-book helps you connect and share with the people in your
                    life.
                </span>
            </div>
            <div className="login_2">
                <div className="login_2_wrap">
                    <Formik
                        enableReinitialize
                        initialValues={{ email, password }}
                        validationSchema={loginValidation}
                        onSubmit={() => {
                            loginSubmit();
                        }}
                    >
                        {(formik) => (
                            <Form>
                                <LoginInput
                                    type="text"
                                    name="email"
                                    placeholder="Email address or phone number"
                                    onChange={handleLoginChange}
                                />
                                <LoginInput
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleLoginChange}
                                    bottom
                                />
                                <button type="submit" className="blue_btn">
                                    Log In
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <Link to="/reset" className="forgot_password">
                        Forgotten password?
                    </Link>
                    <DotLoader color="#1876f2" loading={loading} size={30} />

                    {error && <div className="error_text">{error}</div>}
                    <div className="sign_splitter"></div>
                    <button
                        className="blue_btn open_signup"
                        onClick={() => setVisible(true)}
                    >
                        Create Account
                    </button>
                </div>
                <Link to="/" className="sign_extra">
                    <b>Create a Page</b> for a celebrity, brand or business.
                </Link>
            </div>
        </div>
    );
}
