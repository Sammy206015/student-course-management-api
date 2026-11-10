# Student Course Management API

## Project Overview

The Student Course Management API is a backend application developed using Node.js, Express.js, and MongoDB. It provides a system for managing students, courses, course registrations, and students' academic performance.

The API allows schools to register students, create courses, assign courses to students, and manage their scores.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- Postman (API testing)

## Features

### Student Management
- Register new students.
- Store student information, including first name, last name, email, phone number, and password.
- Retrieve student records.
- Retrieve courses registered by a student.

### Course Management
- Create new courses.
- Store course title, course code, and description.
- Register students for courses.
- Retrieve students registered for a particular course.

### Score Management
- Record students' scores for courses.
- Retrieve a student's academic performance.
- Associate each score record with the relevant student and course.

## Project Structure

```text
schoolManagementAPI/
│
├── models/
├── controllers/
├── routes/
│
├── db.js
├── index.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Sammy206015/student-course-management-api.git
```

### 2. Navigate into the Project Directory

```bash
cd schoolManagementAPI
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Replace the placeholder with your MongoDB connection string.

### 5. Start the Application

```bash
node index.js
```

If you have configured Nodemon, you can also run:

```bash
npm run dev
```

## API Endpoints

The following endpoints describe the main operations supported by the application. Update the paths if your route definitions use different URLs.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/students/register` | Register a student |
| POST | `/api/courses/create-course` | Create a course |
| POST | `/api/courses/register-course` | Register a student for a course |
| GET | `/api/students/:id/courses` | Get a student's registered courses |
| GET | `/api/courses/:id/students` | Get students registered for a course |
| POST | `/api/scores/create-score` | Record a student's score |
| GET | `/api/scores/student/:id` | Retrieve a student's scores |

## Database Models

The application uses three MongoDB models:

**1. Student**
- First name
- Last name
- Email
- Phone number
- Password
- Registered courses

**2. Course**
- Course title
- Course code
- Description
- Registered students

**3. Score**
- Student reference
- Course reference
- CA score
- Examination score

## Testing

The API endpoints can be tested using Postman by sending HTTP requests with the appropriate request body and parameters.

## Author

Developed as a backend development project.
