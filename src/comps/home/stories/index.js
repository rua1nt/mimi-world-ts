import { useMediaQuery } from "react-responsive";
import { stories } from "../../../data/home";
import { ArrowRight, Plus } from "../../../svg";
import Story from "./Story";
import "./style.css";

export default function Stories({ user }) {
    const query1175px = useMediaQuery({ query: "(max-width: 1239px)" });
    const query1030px = useMediaQuery({ query: "(max-width: 1130px)" });
    const query960px = useMediaQuery({ query: "(max-width: 1040px)" });
    const query885px = useMediaQuery({ query: "(max-width: 930px)" });
    const query806px = useMediaQuery({ query: "(max-width: 810px)" });
    const max = query806px
        ? stories.length
        : query885px
        ? 1
        : query960px
        ? 2
        : query1030px
        ? 3
        : query1175px
        ? 2
        : 3;

    return (
        <div className="stories">
            <div className="create_story_card">
                <img
                    src={user?.photoURL || "../../../images/default_pic.png"}
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
