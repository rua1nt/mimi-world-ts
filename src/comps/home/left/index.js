import { useState } from "react";
import { Link } from "react-router-dom";
import { left } from "../../../data/home";
import LeftLink from "./LeftLink";
import Shortcut from "./Shortcut";
import { ArrowDown1, Logo } from "../../../svg";
import "./style.css";

export default function LeftHome({ user }) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="left_home scrollbar">
            {/* <Link to="/profile" className="left_link hover9">
                <img src={user?.picture} alt="" />
                <span>
                    {user?.first_name} {user.last_name}
                </span>
            </Link> */}
            {left.slice(0, 7).map((link, i) => (
                <LeftLink
                    key={i}
                    img={link.img}
                    text={link.text}
                    notification={link.notification}
                />
            ))}
            {!visible && (
                <div
                    className="left_link hover9"
                    onClick={() => {
                        setVisible(true);
                    }}
                >
                    <div className="small_circle">
                        <ArrowDown1 />
                    </div>
                    <span>See more</span>
                </div>
            )}
            {visible && (
                <div className="more_left">
                    {left.slice(7, left.length).map((link, i) => (
                        <LeftLink
                            key={i}
                            img={link.img}
                            text={link.text}
                            notification={link.notification}
                        />
                    ))}
                    <div
                        className="left_link hover9"
                        onClick={() => {
                            setVisible(false);
                        }}
                    >
                        <div className="small_circle rotate360">
                            <ArrowDown1 />
                        </div>
                        <span>Show less</span>
                    </div>
                </div>
            )}
            <div className="splitter"></div>

            <div className="shortcut">
                <div className="heading">Your Shortcuts</div>
                <div className="edit_shortcut hover2">Edit</div>
            </div>
            <div className="shortcut_list">
                <Shortcut
                    link="https://www.facebook.com/thaoly.huynhngoc"
                    name="Facebook"
                    svg={<Logo className="shortcut_item_svg" />}
                />
                <Shortcut
                    link="https://www.facebook.com/thaoly.huynhngoc"
                    img="../../images/ytb.png"
                    name="Youtube"
                />
                <Shortcut
                    link="https://www.facebook.com/thaoly.huynhngoc"
                    img="../../images/insta.png"
                    name="Instagram"
                />
            </div>

            <div className="fb_copyright relative_fb_copyright">
                <Link to="/">Privacy</Link>
                <span> . </span>
                <Link to="/">Terms</Link>
                <span> . </span>
                <Link to="/">Advertising</Link>
                <span> . </span>
                <Link to="/">
                    <span>Ad Choices </span>
                    <i className="ad_choices_icon"></i>
                </Link>
                <span> . </span>
                <Link to="/">Cookies</Link>
                <span> . </span>
                <Link to="/">More</Link>
                <span> . Mimi © 2023</span>
            </div>
        </div>
    );
}
