# Lab: Create Feedback Form for Survey

**Estimated time needed:** 40 minutes

---

## What you will learn

In this lab, you will create a feedback form using React functional components and manage user details using the `useState` hook. You will implement event handlers to manage form input changes, validate user inputs, and handle form submissions. Additionally, you will create a confirmation dialog using the `confirm` method to confirm user details before final submission. Upon successful submission, you will reset the form fields and display a thank you message to the user.

## Learning objectives

After completing this lab, you will be able to:

- Create a form to collect user feedback, including their name, email, and the feedback message.
- Handle form submission, including data validation, to ensure that the users enter their names and provide feedback before submitting the form.
- Display a confirmation dialog to users after they submit their feedback, showing the information they entered and prompting them to confirm before final submission.
- Reset the form fields to clear the input values and provide users with a clean form for submitting additional feedback.

## Prerequisites

- Basic knowledge of HTML
- Intermediate knowledge of JavaScript
- Basic knowledge of React function component, `useState` hook, and handling forms

---

## Step 1: Setting up the Environment

1. From the menu on top of the lab, click the **Terminal** tab at the top-right of the window, and then click **New Terminal**.

2. Clone the boiler template for this React application:

```html
git clone https://github.com/ibm-developer-skills-network/feedback_form.git
```

3. This will create a folder named **`feedback_form`** under the project folder. The application includes a class component named **`FeedbackForm.jsx`** and a CSS file named **`FeedbackForm.css`**, with this structure:

```
feedback_form/
└── src/
    ├── Components/
    │   ├── FeedbackForm.css
    │   └── FeedbackForm.jsx
    ├── App.css
    ├── App.jsx
    ├── index.css
    └── main.jsx
```

4. Navigate into the `feedback_form` folder:

```html
cd feedback_form
```

5. Install all necessary packages:

```html
npm install
```

   Then run the application (provides port 4173):

```html
npm run preview
```

6. To view your React application, click the **Skills Network** icon on the left panel → **Launch Application** → enter port **4173** → click the launch button.

7. The initial output will display a heading **"Tell Us What You Think"** with a card showing "We'd Love to Hear From You!" and "Please share your feedback with us."

8. *(Optional)* Preserve your work by adding, committing, and pushing to your GitHub repository so you can resume from where you left off.

---

## Step 3: Create Basic Template

1. Navigate to the `Components` folder in your React project's `src` folder.

2. Open `FeedbackForm.jsx`. Inside the `return` of this component, you have a `<nav>` tag and a `<form>` tag with class name `feedback-form`, which includes a child `<h2>` tag with a `<p>` tag.

3. Add three input fields and one submit button inside the form to collect the following user details:
   - First input box for username
   - Second input box for user email ID
   - Third input box (textarea) for user feedback

```javascript
<input
  type="text"
  name="name"
  placeholder="Your Name"
/>
<input
  type="email"
  name="email"
  placeholder="Your Email"
/>
<textarea
  name="feedback"
  placeholder="Your Feedback"
></textarea>
<button type="submit">Submit Feedback</button>
```

4. Stop the app (`Ctrl+C`), re-run with `npm run preview`, and refresh to see the form with all three fields and the Submit button.

> **Note:** If the application is already running, you just need to refresh the application page.

---

## Step 4: Initialize States to Handle Form Data

1. Import the `useState` hook from React at the top of the component:

```javascript
import React, { useState } from 'react';
```

2. Use the `useState` hook to create a `formData` state variable initialized with empty strings for `name`, `email`, and `feedback`. Include this code **before** the `return` of the component:

```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  feedback: ''
});
```

---

## Step 5: Implement Change Handlers

1. Define a `handleChange` function to update the form data state as users input their information. Create this after the `useState` initialization:

```javascript
const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value
  });
};
```

**How it works:**

- `const handleChange = (event) => { ... }` — Declares an arrow function that takes an `event` parameter representing the user's interaction with an input element.
- `const { name, value } = event.target` — Extracts the `name` attribute and current `value` from the input field that triggered the event.
- `setFormData({ ...formData, [name]: value })` — Updates state immutably by spreading existing `formData` and overwriting only the changed field. A new object is created rather than modifying state directly.

---

## Step 6: Integrate Form State and onChange Event

1. Bind the input fields to their respective state variables using `value` and wire up the `onChange` handler:

```javascript
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
```

> **Note:** Add the `value` and `onChange` attributes to your existing input fields and textarea.

---

## Step 7: Handle Form Submission

1. Implement the `handleSubmit` function just **before** the `return` of the `FeedbackForm` component:

```javascript
const handleSubmit = (event) => {
  event.preventDefault();

  const confirmationMessage = `
  Name: ${formData.name}
  Email: ${formData.email}
  Feedback: ${formData.feedback}
  `;

  const isConfirmed = window.confirm(`Please confirm your details:\n\n${confirmationMessage}`);

  if (isConfirmed) {
    console.log('Submitting feedback:', formData);
    setFormData({
      name: '',
      email: '',
      feedback: ''
    });
    alert('Thank you for your valuable feedback!');
  }
};
```

**How it works:**

- `event.preventDefault()` — Prevents the default browser form submission (page reload).
- `confirmationMessage` — A template literal that constructs a readable summary of the user's input.
- `window.confirm(...)` — Displays a browser dialog. Returns `true` if the user clicks **OK**, `false` if they click **Cancel**.
- `if (isConfirmed)` — Only proceeds with submission if the user confirmed.
- `setFormData({ ... })` — Resets all fields to empty strings, clearing the form.
- `alert(...)` — Displays a thank you message after successful submission.

---

## Step 8: Implement onSubmit Event Handler

1. Add the `onSubmit` event handler to the `<form>` tag:

```javascript
<form onSubmit={handleSubmit} className="feedback-form">
```

---

## Step 9: Check the Output

1. Stop the app (`Ctrl+C`), re-run with `npm run preview`, and fill in the form fields. Click **Submit Feedback**. A confirm dialog will appear showing the entered details.

2. Click **OK** → a thank you alert will display and the form will be cleared.

3. Click **Cancel** → the confirm box closes and the form retains the filled details.

**Congratulations! You have created a feedback form application!**

<details>
<summary>Click here for the entire code solution for FeedbackForm.jsx</summary>

```javascript
import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const confirmationMessage = `
    Name: ${formData.name}
    Email: ${formData.email}
    Feedback: ${formData.feedback}
    `;

    const isConfirmed = window.confirm(`Please confirm your details:\n\n${confirmationMessage}`);

    if (isConfirmed) {
      console.log('Submitting feedback:', formData);
      setFormData({
        name: '',
        email: '',
        feedback: ''
      });
      alert('Thank you for your valuable feedback!');
    }
  };

  return (
    <>
      <nav>
        <h1>Tell Us What You Think</h1>
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
        <button type="submit">Submit Feedback</button>
      </form>
    </>
  );
};

export default FeedbackForm;
```

</details>

---

## Practice Exercise

In this exercise, you will extend the form with a star rating system using radio buttons.

### Steps

1. Add a `rating` field to the `formData` `useState` hook, initialized as an empty string:

```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  feedback: '',
  rating: ''   // add this
});
```

2. Add five radio buttons (values 1–5) inside the form, each using the same `handleChange` handler:

```javascript
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
```

3. The `handleChange` function requires **no changes** — the spread operator already handles the new `rating` field automatically.

4. Update `handleSubmit` to include the rating in the confirmation message:

```javascript
const rating = formData.rating;
const confirmationMessage = `
Name: ${formData.name}
Email: ${formData.email}
Feedback: ${formData.feedback}
Rating: ${rating}
`;
```

5. Re-run the application and submit the form. The confirmation dialog will now display the rating alongside the other details.

<details>
<summary>Click here for the entire Practice Exercise code solution</summary>

```javascript
import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
    rating: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const rating = formData.rating;

    const confirmationMessage = `
    Name: ${formData.name}
    Email: ${formData.email}
    Feedback: ${formData.feedback}
    Rating: ${rating}
    `;

    const isConfirmed = window.confirm(`Please confirm your details:\n\n${confirmationMessage}`);

    if (isConfirmed) {
      console.log('Submitting feedback:', formData);
      setFormData({
        name: '',
        email: '',
        feedback: '',
        rating: ''
      });
      alert('Thank you for your valuable feedback!');
    }
  };

  return (
    <>
      <nav>
        <h1>Tell Us What You Think</h1>
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
```

</details>

---

## Conclusion

In this lab you:

- Implemented a `FeedbackForm` component using React's `useState` hook to manage form data state (name, email, feedback).
- Built a `handleChange` function that updates state immutably as the user types, using the spread operator and computed property names.
- Built a `handleSubmit` function that prevents default submission, shows a `window.confirm` dialog, resets the form on confirmation, and displays a thank you `alert`.
- Extended the form with radio button inputs for a 1–5 rating system in the Practice Exercise.

---

*Author: Richa Arora*  
*© IBM Corporation. All rights reserved.*  
*Licensed under Apache 2.0*
