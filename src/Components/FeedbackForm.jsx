import React, {useState} from 'react';
import './FeedbackForm.css'; // Import CSS for styling

const FeedbackForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedback: '',
        rating: ""
    });


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const confirmationMessage = `
    Name: ${formData.name}
     Email: ${formData.email}
     Feedback: ${formData.feedback}
     Rating: ${formData.rating}
     `;

        const isConfirmed = window.confirm(`Please confirm your details: \n\n ${confirmationMessage}`)
        if (isConfirmed) {
            console.log('Submitting feedback', formData);
            setFormData({
                name: "",
                email: "",
                feedback: ""
            });
            alert("Thanks for submitting feedback")
        }

    };


    return (
        <>
            <nav>
                Tell Us What You Think
            </nav>
            <form onSubmit={handleSubmit} className="feedback-form">
                <h2>We'd Love to Hear From You!</h2>
                <p>Please share your feedback with us.</p>
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <textarea
                    name="feedback"
                    placeholder="Your Feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                ></textarea>
                <p>Rate Us:</p>
                {[1, 2, 3, 4, 5].map((val) => (
                    <label key={val}>
                        <input
                            type="radio"
                            name="rating"
                            value={val}
                            onChange={handleChange}
                        />
                        {val}
                    </label>
                ))}
                <button type="submit">Submit Feedback</button>
            </form>
        </>
    );
};

export default FeedbackForm;
