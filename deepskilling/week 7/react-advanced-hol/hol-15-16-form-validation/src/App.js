import React, { useState } from 'react';

// HOL 15 & 16: React Controlled Form & Validation
export default function App() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    role: 'developer',
    comments: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.username.trim()) {
      errs.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errs.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Invalid email address format';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errs.phone = 'Phone number must be exactly 10 digits';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSubmitted(true);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    boxSizing: 'border-box'
  };

  const errorStyle = { color: '#e53935', fontSize: '0.85rem', marginTop: '4px' };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: '"Segoe UI", Roboto, sans-serif', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
      <h2>Employee Registration Form (HOL 15 & 16)</h2>
      {submitted ? (
        <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '15px', borderRadius: '6px' }}>
          <h4>✅ Registration Successful!</h4>
          <p>Thank you, <strong>{formData.username}</strong> ({formData.email}).</p>
          <button onClick={() => setSubmitted(false)} style={{ marginTop: '10px', padding: '6px 12px' }}>Submit Another</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>Username *</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} style={inputStyle} />
            {errors.username && <div style={errorStyle}>{errors.username}</div>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Email Address *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} />
            {errors.email && <div style={errorStyle}>{errors.email}</div>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Phone Number (10 Digits) *</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} />
            {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Job Role</label>
            <select name="role" value={formData.role} onChange={handleChange} style={inputStyle}>
              <option value="developer">Software Engineer</option>
              <option value="frontend">Frontend Engineer</option>
              <option value="backend">Backend Engineer</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Comments / Experience</label>
            <textarea name="comments" value={formData.comments} onChange={handleChange} rows="3" style={inputStyle} />
          </div>

          <button type="submit" style={{ padding: '10px 20px', background: '#1976d2', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            Register Employee
          </button>
        </form>
      )}
    </div>
  );
}
