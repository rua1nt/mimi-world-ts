import { useMediaQuery } from "react-responsive";
import { stories } from "../../../data/home";
import { ArrowRight, Plus } from "../../../svg";
import Story from "./Story";
import "./style.css";

export default function Stories({ user }) {
    const query1175px = useMediaQuery({
        query: "(max-width: 1239px)",
    });
    const query1030px = useMediaQuery({
        query: "(max-width: 1130px)",
    });
    const query960px = useMediaQuery({
        query: "(max-width: 960px)",
    });
    const query885px = useMediaQuery({
        query: "(max-width: 885px)",
    });
    const max = query885px
        ? 5
        : query960px
        ? 4
        : query1030px
        ? 5
        : query1175px
        ? 4
        : stories.length;

    return (
        <div className="stories">
            <div className="create_story_card">
                <img
                    src={
                        user ? user.photoURL : "../../../images/default_pic.png"
                    }
                    alt=""
                    className="create_story_img"
                />
                <div className="plus_story">
                    <Plus color="#fff" />
                </div>
                <div className="story_create_text">Create Story</div>
            </div>
            {stories.slice(0, max).map((story, i) => (
                <Story key={i} story={story} />
            ))}
            <div className="white_circle hover1">
                <ArrowRight color="#65676b" />
            </div>
        </div>
    );
}