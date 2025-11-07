import React, { useState } from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-white py-12 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-gray-900 text-4xl font-bold mb-3">
            Get In Touch
          </h1>
          <p className="text-gray-600 text-base max-w-xl mx-auto">
            Have a question? We're here to help. Fill out the form and we'll
            respond shortly.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-8 py-16 ">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
            <h2 className="text-gray-900 text-2xl font-bold mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2 text-sm"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-xl outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all duration-300 text-gray-900 placeholder-gray-400"
                />
              </div>

              
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2 text-sm"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-xl outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all duration-300 text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="issue"
                  className="block text-gray-700 font-semibold mb-2 text-sm"
                >
                  Describe Your Issue <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="issue"
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us what you need help with..."
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-xl outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all duration-300 text-gray-900 placeholder-gray-400 resize-none"
                ></textarea>
              </div>

             
              <button
                type="submit"
                className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
