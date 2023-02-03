export default function Shortcut({ link, img, name, svg }) {
    if (svg === undefined) {
        return (
            <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="shortcut_item hover2"
            >
                <img src={img} alt="" />
                <span>{name}</span>
            </a>
        );
    }

    return (
        <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="shortcut_item hover2"
        >
            {svg}
            <span>{name}</span>
        </a>
    );
}
