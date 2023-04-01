import Timeline from "react-image-timeline";
require("react-image-timeline/dist/timeline.css");

export default function VertTimelinePosts({ posts, user }) {
    const events = [
        {
            date: new Date(2013, 9, 27),
            text: "Sed leo elit, pellentesque sit amet congue quis, ornare nec lorem.",
            title: "Cairo, Egypt",
            buttonText: "Click Me",
            imageUrl:
                "http://github.com/aaron9000/react-image-timeline/blob/master/src/assets/cairo.jpg?raw=true",
            onClick: console.log,
        },
        {
            date: new Date(2015, 9, 27),
            text: "Sed leo elit, pellentesque sit amet congue quis, ornare nec lorem.",
            title: "Cairo, Egypt",
            buttonText: "Click Me",
            imageUrl:
                "http://github.com/aaron9000/react-image-timeline/blob/master/src/assets/cairo.jpg?raw=true",
            onClick: console.log,
        },
    ];

    return <Timeline events={events} reverseOrder denseLayout />;
}
