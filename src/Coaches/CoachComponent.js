export default function CoachComponent(props) {
    const {name, age, description, img, contact} = props

    return (
        <div className="coaches-list">
            <div className="coach-info">
                <h2 className="coach-name">{name}</h2>
                <h3 className="coach-age">Age: {age}</h3>
                <h3 className="coach-age">Contact: {contact}</h3>
                <h4 className="coach-about">{description} </h4>
            </div>
        </div>

    );
}