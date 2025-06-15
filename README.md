# Node.js Blog Application

This is a simple blog application built with Node.js, Express.js, and MongoDB. It includes user authentication (signup, login with JWT), profile image uploads, and CRUD (Create, Read, Update, Delete) functionality for blog posts, along with a comment system.

---

## Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd nodejs-blog-app # or whatever your project directory is named
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the root of your project and add the following:
    ```
    MONGO_URI=mongodb://localhost:27017/blogapp
    JWT_SECRET=your_secret_key_here # Use a strong, random string
    PORT=5000
    ```
    * Make sure you have MongoDB running locally or provide a connection string to your MongoDB Atlas cluster.

---

## Swagger API Documentation
Interactive API documentation is available via Swagger UI.

Open your browser and navigate to: http://localhost:5000/api-docs

## Running the Application

To start the server in development mode (with auto-restart on file changes):

```bash
npm run dev

