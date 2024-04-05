// pages/client-registration.js

"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ClientRegistration = () => {
  const router = useRouter();

  // State to hold form data
  const [formData, setFormData] = useState({
    clientName: '',
    redirectUri: '',
  });

  // Function to handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send form data to your backend for client registration
    try {
      const response = await fetch('http://localhost:8080/api/client-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Redirect to success page or dashboard
        router.push('/dashboard');
      } else {
        // Handle registration error
        console.error('Client registration failed');
      }
    } catch (error) {
      console.error('Error registering client:', error);
    }
  };

  return (
    <div>
      <h1>Client Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="clientName">Client Name</label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="redirectUri">Redirect URI</label>
          <input
            type="url"
            id="redirectUri"
            name="redirectUri"
            value={formData.redirectUri}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default ClientRegistration;
