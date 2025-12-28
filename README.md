# Buyonic

**Buyonic** is a frontend-focused e-commerce application built to demonstrate practical React skills and modern frontend development patterns.  
This project is part of my resume and showcases how I approach UI architecture, state management, routing, and real-world user flows using only frontend technologies.

Live demo: https://buyonic.netlify.app  
Repository: https://github.com/rahman-D3V/Buyonic

---

## Why this project exists

This project does not aim to solve a specific business problem.

The goal of Buyonic is to **prove hands-on frontend capability** beyond basic CRUD apps by simulating real-world e-commerce flows such as authentication, cart handling, filtering, form validation, and user interaction patterns.

Everything is implemented on the frontend, with an emphasis on:
- Clean UI structure
- Predictable state flow
- Realistic user experience
- Incremental feature development

---

## Features

### Core UI & Navigation
- Responsive layout across screen sizes
- Reusable UI components
- Structured homepage with hero, categories, and product sections
- Client-side routing using React Router

### Authentication (Frontend-simulated)
- Sign up and sign in flow
- Guest login using demo credentials
- Login state handling on the client
- Logout flow with proper state cleanup

### Shopping Experience
- Product listing pages by category
- Product search and navigation
- Add to cart functionality
- Cart access restricted to logged-in users
- Cart data persisted in localStorage

### Filtering & Sorting
- Filter products based on selected parameters
- Sorting support on shopping pages
- UI and data updates wired together cleanly

### Checkout & Validation
- OTP-style email verification flow (frontend-only)
- Checkout blocked for unverified users
- Address input with real-time auto-suggestions (powered by LocationIQ)
- Contact form with validation using React Hook Form

### UX & Polish
- Subtle UI animations on home and product pages
- Improved responsiveness across breakpoints
- Multiple UI refinements and layout fixes
- Consistent styling and spacing across pages

---

## Tech Stack

- **React.js**
- **React Router**
- **Tailwind CSS**
- **Zustand** for state management
- **React Hook Form** for form handling and validation
- **Aceternity UI** for UI animations
- **EmailJS** for email-based flows 
- **LocationIQ** for address auto-suggestions 
- **React Icons**
- **Netlify** for deployment

---

## Project Structure & Development

- Built incrementally with feature-based commits
- Refactored components as complexity increased
- Separated concerns between UI, state, and logic
- Focused on readability and maintainability over shortcuts

This is a **solo project**, fully designed and implemented by me.

---

## Limitations & Scope

- This is a **pure frontend project**
- No real backend or database is used
- Authentication, OTP verification, and checkout logic are simulated on the client
- Product data is static

The project is intentionally scoped this way to focus on frontend architecture and user experience.  
It can be extended into a full-stack application in the future.

---

## What this project demonstrates

- Ability to work with modern React and ecosystem tools
- Understanding of real-world UI flows
- State management beyond basic examples
- Clean routing and component organization
- Incremental development with meaningful commits

---

## Author

Built by **Habibur Rahman**  
Portfolio: https://rahmanjs.in
