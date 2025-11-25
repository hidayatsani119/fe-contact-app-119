
# Contact Management App (Frontend)

A modern, responsive frontend application built with **Vue 3** and **Vite** for managing personal contacts and their associated addresses. This application interfaces with a backend REST API to provide secure user authentication and comprehensive data management capabilities.

## Features

### User Authentication
- **Registration & Login**: Secure user onboarding and authentication using token-based auth.
- **Profile Management**: Users can update their display name and change their password.
- **Session Management**: Automatic logout and token handling via local storage.

### Contact Management
- **CRUD Operations**: Create, Read, Update, and Delete contacts.
- **Search & Filter**: Search contacts by name, email, or phone number.
- **Pagination**: Navigate through large lists of contacts efficiently.
- **Detailed View**: View comprehensive contact information including linked addresses.

### Address Management
- **Multi-Address Support**: Add multiple addresses (Home, Office, etc.) to a single contact.
- **Address CRUD**: Create, update, and delete addresses for specific contacts.

### UI/UX
- **Responsive Design**: Mobile-friendly interface built with **Tailwind CSS** and **DaisyUI**.
- **Interactive Alerts**: Beautiful confirmation and error popups using **SweetAlert2**.
- **Loading Animations**: Smooth fade-in transitions for a polished user experience.

## Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API with `<script setup>`)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Routing**: [Vue Router](https://router.vuejs.org/)
- **State/Storage**: [VueUse](https://vueuse.org/) (`useLocalStorage`)
- **HTTP Client**: Native Fetch API
- **Notifications**: [SweetAlert2](https://sweetalert2.github.io/)

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fe-contact-app-119
   ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory (or modify the existing one).

    *Example `.env`:*

    ```properties
    VITE_API_PATH=http://localhost:3000/api
    ```

    > Ensure your backend server is running and accessible at this URL.

4.  **Run the development server**

    ```bash
    npm run dev
    ```

5.  **Build for production**

    ```bash
    npm run build
    ```

## Project Structure

   ```
   src/
   ├── assets/          # Static assets (images, logos)
   ├── components/      # Vue components
   │   ├── address/     # Address-related forms (Create, Edit)
   │   ├── contact/     # Contact CRUD components (List, Detail, Create, Edit)
   │   ├── not-found/   # 404 Page
   │   └── user/        # Authentication & Profile components
   ├── lib/
   │   ├── api/         # API service modules (UserApi, ContactApi, AddressApi)
   │   └── alert.js     # SweetAlert2 wrapper utilities
   ├── router/          # (Implicit in main.js) Route definitions
   ├── App.vue          # Root component
   ├── main.js          # Application entry point & Router configuration
   └── style.css        # Global styles & Tailwind directives
   ```

## API Integration

The app is designed to consume a RESTful API with the following endpoints (inferred from usage):

  - **Users**: `/users/login`, `/users`, `/users/current`, `/users/logout`
  - **Contacts**: `/contacts`, `/contacts/:id`
  - **Addresses**: `/contacts/:contactId/addresses`, `/contacts/:contactId/addresses/:addressId`
  - **Backend-Github**: [be-contact-app-119](https://github.com/hidayatsani119/be-contact-app-119)
  

All authenticated requests must include the Authorization header with the user's token.
