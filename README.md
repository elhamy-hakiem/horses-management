# 🐎 Horse Management App

A web application for managing horses, built with React, Tailwind CSS, and a modern stack.  
Includes authentication, horse listing with details, and protected routes. Designed to be clean, fast, and scalable ✨

---

## 🚀 Tech Stack

| Tech                  | Purpose                                      |
|-----------------------|----------------------------------------------|
| **Vite**              | Lightning-fast build tool                   |
| **React**             | UI development                              |
| **Tailwind CSS**      | Utility-first modern styling                |
| **React Router DOM**  | Page routing                                |
| **Axios**             | API communication                           |
| **React Toastify**    | Success and error notifications             |
| **Formik & Yup**      | Form handling and validation                |
| **React Spinners**    | Loading indicators                          |

---

## 📡 APIs Used

- 🐴 Get all horses  
  `GET https://noonacademy_anCOzle.jeyad360.com/organization/v1/d/horses`

- 🔍 Get horse by ID  
  `GET https://noonacademy_anCOzle.jeyad360.com/organization/v1/d/horses/:id`

- 🔐 Login  
  `POST https://noonacademy_anCOzle.jeyad360.com/organization/v1/d/login`

---

## 🔐 Authentication Flow

- Token is securely stored in `localStorage`.
- All routes except `/login` are protected.
- Authorization token is sent in the `Authorization: Bearer <token>` header.
- Logout functionality clears the token and redirects to the login page.

---

## 🛠 Features Implemented

### 1. Main Page - `/horses`
- Displays a list of horses with details: image, name, age, and breed.
- Live search functionality to filter horses by name.
- Pagination to limit the number of horses displayed per page.
- Responsive and clean design for a smooth user experience.

### 2. Horse Details Page - `/horses/:id`
- Shows full information about a selected horse.
- Dynamically loads data based on the horse ID in the URL.
- Allows users to upload a new horse image with a preview.

### 3. Authentication
- Login page for user authentication.
- Verifies user credentials before granting access to other pages.
- Protects routes to ensure only authenticated users can access them.

### 4. Dark Mode
- Added support for dark mode using Tailwind CSS.
- Theme preference is saved in `localStorage` and applied globally.

### 5. Error Handling and Loading Indicators
- Displays clear error messages when data loading fails.
- Shows loading indicators during API calls for better user experience.

### 6. State Management and URL Preservation
- Preserves search and pagination states in the browser URL.
- Optimized state management using React hooks.

---

## 📁 Project Structure

```bash
src/
├── assets/          # Static assets (images, etc.)
├── components/      # Reusable UI components
├── pages/           # Page components for routing
├── services/        # Axios API services
├── context/         # Context files for global state
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── [App.jsx]        # Main application component
└── [main.jsx]       # Entry point for the React app
