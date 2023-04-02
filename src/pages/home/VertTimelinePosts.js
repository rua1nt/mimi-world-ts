import Timeline from "react-image-timeline";
require("react-image-timeline/dist/timeline.css");

export default function VertTimelinePosts({ posts, user }) {
    const handleDefaultClick = () => {
        console.log("handleDefaultClick");
    };

    const VertHeader = (props) => {
        const { title, date, extras } = props.event;
        const { post } = extras;

        return (
            <div className="v__header" onClick={handleDefaultClick}>
                <h1>{title}</h1>
                <p>{date.toDateString()}</p>
            </div>
        );
    };

    const VertTextBody = () => {
        return <div className="v__text_body"></div>;
    };

    const VertFooter = () => {
        return <div className="v__footer"></div>;
    };

    const events = posts.map((post) => {
        return {
            date: post.created_at.toDate(),
            text: "Default text..",
            title: "Default title..",
            buttonText: "Default Btn",
            imageUrl: post.images?.[0] || post.background,
            onClick: console.log,
            extras: { ...post },
        };
    });

    const test_events = [
        {
            date: new Date(2021, 3, 22),
            text: "Sed leo elit, pellentesque sit amet congue quis, ornare nec lorem.",
            title: "Cairo, Egypt",
            buttonText: "Click Me",
            imageUrl:
                "http://github.com/aaron9000/react-image-timeline/blob/master/src/assets/cairo.jpg?raw=true",
            onClick: handleDefaultClick,
            extras: {},
        },
        {
            date: new Date(2022, 3, 22),
            text: "Sed leo elit, pellentesque sit amet congue quis, ornare nec lorem.",
            title: "Cairo, Egypt",
            buttonText: "Click Me",
            imageUrl:
                "http://github.com/aaron9000/react-image-timeline/blob/master/src/assets/cairo.jpg?raw=true",
            onClick: handleDefaultClick,
            extras: {},
        },
    ];

    return (
        <Timeline
            events={events}
            customComponents={{ header: VertHeader, textBody: VertTextBody, footer: VertFooter }}
            denseLayout
            reverseOrder
        />
    );
}
