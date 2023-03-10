import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import LoginInput from "../../comps/inputs/loginInput";

export default function SearchAccount({
    email,
    setEmail,
    error,
    setError,
    setLoading,
    setUserInfos,
    setVisible,
}) {
    const validateEmail = Yup.object({
        email: Yup.string()
            .required("Email address ir required.")
            .email("Must be a valid email address.")
            .max(50, "Email address can't be more than 50 characters."),
    });

    const handleSearch = async () => {
        try {
            setLoading(true);
            // const { data } = await axios.post(
            //     `${process.env.REACT_APP_BACKEND_URL}/findUser`,
            //     { email }
            // );
            // setUserInfos(data);
            setUserInfos({
                email: "tatut90@gmail.com",
                photoURL:
                    "https://lh3.googleusercontent.com/a/AEdFTp76jl-5mVBVbBmb5wky4S168dy9hXSmGzFy96McdA=s96-c",
            });
            setVisible(1);
            setError("");
            setLoading(false);
        } catch (ex) {
            setLoading(false);
            // setError(ex.response.data.message);
            setError(ex.message);
        }
    };

    return (
        <div className="reset_form">
            <div className="reset_form_header">Find Your Account</div>
            <div className="reset_form_text">
                Please enter your email address or mobile number to search for
                your account.
            </div>
            <Formik
                enableReinitialize
                initialValues={{
                    email,
                }}
                validationSchema={validateEmail}
                onSubmit={() => {
                    handleSearch();
                }}
            >
                {(formik) => (
                    <Form>
                        <LoginInput
                            type="text"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address or phone number"
                        />
                        {error && <div className="error_text">{error}</div>}
                        <div className="reset_form_btns">
                            <Link to="/login" className="gray_btn">
                                Cancel
                            </Link>
                            <button type="submit" className="blue_btn">
                                Search
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
