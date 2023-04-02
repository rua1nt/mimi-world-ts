import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../../comps/header";
import LeftHome from "../../comps/home/left";
// import RightHome from "../../comps/home/right";
// import Stories from "../../comps/home/stories";
// import CreatePost from "../../comps/createPost";
import ActivateForm from "./ActivateForm";
// import "./style.css";

export default function Activate() {
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token } = useParams();

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        activateAccount();
    }, []);

    const activateAccount = async () => {
        try {
            setLoading(true);
            // TODO: verify attached token url via email by sendVerificationLink()
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/activate`,
                { token },
                {
                    headers: { Authorization: `Bearer ${user?.token}` },
                }
            );
            setSuccess(data.message);
            Cookies.set("user", JSON.stringify({ ...user, verified: true }));
            dispatch({ type: "VERIFY", payload: true });
            setTimeout(() => navigate("/"), 3000);
        } catch (ex) {
            setError(ex.message);
            setTimeout(() => navigate("/"), 5000);
        }
    };

    return (
        <div className="home">
            {success && (
                <ActivateForm
                    type="success"
                    header="Account verification succeded ✔️"
                    text={success}
                    loading={loading}
                />
            )}
            {error && (
                <ActivateForm
                    type="error"
                    header="Account verification failed ❌"
                    text={error}
                    loading={loading}
                />
            )}

            <Header />
            <LeftHome user={user} />
            {/* <div className="home_middle">
                <Stories />
            </div> */}
        </div>
    );
}
