

const testimonials = [
    {
        text: "This candidate has shown unwavering commitment to our values and has the vision we need for the future.",
        author: "John Doe",
        title: "Community Leader"
    },
    {
        text: "A true leader with the experience and integrity to make a real difference.",
        author: "Jane Smith",
        title: "Business Owner"
    },
    // Add more testimonials as needed
];

function displayTestimonials() {
    const testimonialsSection = document.getElementById('testimonials');
    testimonials.forEach(testimonial => {
        const testimonialElement = document.createElement('div');
        testimonialElement.classList.add('testimonial');
        testimonialElement.innerHTML = `
            <p class="testimonial-text">"${testimonial.text}"</p>
            <p class="testimonial-author">${testimonial.author}, <span class="testimonial-title">${testimonial.title}</span></p>
        `;
        testimonialsSection.appendChild(testimonialElement);
    });
}

document.addEventListener('DOMContentLoaded', displayTestimonials);

const events = [
    { name: "Town Hall Meeting", date: "2024-03-15", location: "City Hall" },
    { name: "Debate Watch Party", date: "2024-03-20", location: "Local Community Center" },
    // Add more events as needed
];

function displayEvents() {
    const eventsSection = document.getElementById('events');
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.innerHTML = `<h3>${event.name}</h3><p>${event.date} at ${event.location}</p>`;
        eventsSection.appendChild(eventElement);
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', displayEvents);

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,4}\.[0-9]{1,4}\.[0-9]{1,4}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function handleSubmit(event) {
    const emailInput = document.getElementById('email');
    if (!validateEmail(emailInput.value)) {
        alert('Please enter a valid email address.');
        event.preventDefault(); // Prevent form from submitting
    }
}

// Add event listener to your form
const form = document.getElementById('subscription-form');
form.addEventListener('submit', handleSubmit);

