
export default function TestimonialComponent(props) {
    const {name, text} = props

    return (
            <div className="testimonial-list">
                <h2 className="testimonial-name">{name}</h2>
                <h3 className="testimonial-text">{text}</h3>
            </div>
    );
}