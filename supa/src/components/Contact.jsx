import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    // In a real application, you would send this data to a backend service
    // like a serverless function, Formspree, or an email service.
    // For this example, we'll simulate a successful submission.
    console.log('Form submitted:', formData);

    setTimeout(() => {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Contact Us</h2>
          <p className="mt-4 text-xl text-gray-600">
            We'd love to hear from you! Please fill out the form below or reach out to us directly.
          </p>
        </div>

        <div className="mt-12 lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Contact Information Section */}
          <div className="mb-8 lg:mb-0">
            <h3 className="text-2xl font-bold text-gray-900">Get in Touch</h3>
            <p className="mt-4 text-gray-600">
              Our team is ready to answer your questions and provide support.
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail size={20} className="text-gray-500" />
                <span>support@nuvia.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone size={20} className="text-gray-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin size={20} className="text-gray-500" />
                <span>123 Refreshing Rd, Hydration City, 90210</span>
              </div>
            </div>
            {/* Optional: Add a map component here for visual appeal */}
            {/* <div className="mt-8 bg-white rounded-lg shadow-md p-4">
              <img src="https://via.placeholder.com/600x400" alt="Map" className="rounded-md" />
            </div> */}
          </div>

          {/* Contact Form Section */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition"
                >
                  {status ? status : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}