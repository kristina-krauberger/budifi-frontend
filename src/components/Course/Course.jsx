export default function Course({title, duration}) {
    return (
        <button className="course-card">
            <p>Titel: {title}</p>
            <p>Dauer: {duration}</p>
        </button>
    )
}