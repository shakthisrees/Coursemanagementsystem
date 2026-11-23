import React, { useState } from "react";

const CourseForm = () => {
  const initialForm = {
    title: "",
    description: "",
    duration: "",
    level: "",
    price: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccess("");
    setApiError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be at most 100 characters";
    }

    if (formData.description.length > 500) {
      newErrors.description =
        "Description must be at most 500 characters";
    }

    if (formData.duration === "") {
      newErrors.duration = "Duration is required";
    } else if (Number(formData.duration) < 1) {
      newErrors.duration = "Duration must be at least 1";
    }

    if (!formData.level) {
      newErrors.level = "Level is required";
    }

    if (formData.price === "") {
      newErrors.price = "Price is required";
    } else if (Number(formData.price) < 0) {
      newErrors.price = "Price must be non-negative number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
e.preventDefault();

setSuccess("");
setApiError("");

if (!validate()) {
return;
}

const courseData = {
title: formData.title,
description: formData.description,
duration: Number(formData.duration),
level: formData.level,
price: Number(formData.price),
};

try {
const response = await fetch(
"http://localhost:8080/api/courses",
{
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(courseData),
}
);

const data = await response.json();

if (!response.ok) {
throw new Error(
data.message || "Failed to create course"
);
}

setSuccess("Course created successfully");
setFormData(initialForm);
setErrors({});
} catch (error) {
setApiError(
error.message || "Failed to create course"
);
}
};

const handleReset = () => {
setFormData(initialForm);
setErrors({});
setSuccess("");
setApiError("");
};

return (
<div className="form-container">
<h2>Add Course</h2>

<form onSubmit={handleSubmit}>
{/* Title */}
<div>
<label htmlFor="title">Title</label>

<input
id="title"
name="title"
type="text"
data-testid="title-input"
value={formData.title}
onChange={handleChange}
/>

{errors.title && (
<p className="error">{errors.title}</p>
)}
</div>

{/* Description */}
<div>
<label htmlFor="description">Description</label>

<textarea
id="description"
name="description"
data-testid="description-input"
value={formData.description}
onChange={handleChange}
/>

{errors.description && (
<p className="error">
{errors.description}
</p>
)}
</div>

{/* Duration */}
<div>
<label htmlFor="duration">Duration</label>

<input
id="duration"
name="duration"
type="number"
data-testid="duration-input"
value={formData.duration}
onChange={handleChange}
/>

{errors.duration && (
<p className="error">{errors.duration}</p>
)}
</div>

{/* Level */}
<div>
<label htmlFor="level">Level</label>

<select
id="level"
name="level"
data-testid="level-select"
value={formData.level}
onChange={handleChange}
>
<option value="">Select Level</option>

<option value="BEGINEER">
Beginner
</option>

<option value="INTERMEDIATE">
Intermediate
</option>

<option value="ADVANCED">
Advanced
</option>
</select>

{errors.level && (
<p className="error">{errors.level}</p>
)}
</div>

{/* Price */}
<div>
<label htmlFor="price">Price</label>

<input
id="price"
name="price"
type="number"
step="0.01"
data-testid="price-input"
value={formData.price}
onChange={handleChange}
/>

{errors.price && (
<p className="error">{errors.price}</p>
)}
</div>

{/* Buttons */}
<div style={{ marginTop: "1rem" }}>
<button
type="submit"
data-testid="submit-btn"
className="btn-primary"
>
Add Course
</button>

<button
type="button"
data-testid="reset-btn"
className="btn-secondary"
onClick={handleReset}
style={{ marginLeft: "10px" }}
>
Reset
</button>
</div>

{/* Success message */}
{success && (
<p data-testid="api-success">
{success}
</p>
)}

{/* API error */}
{apiError && (
<p
data-testid="api-error"
className="error"
>
{apiError}
</p>
)}
</form>
</div>
);
};

export default CourseForm;