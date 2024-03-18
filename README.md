# Vulse Quiz: Quizzi

## Overview

This project consists of a client-side application built with Next.js and a server-side application using Express.js. The client-side application serves as the frontend for the project, while the server-side application provides backend functionality and APIs.

## Features

- **Client-side Application (Next.js):**

  - Frontend UI built using React.js and Next.js.
  - Provides an interactive user interface for the application.
  - Implements client-side routing for efficient navigation.

- **Server-side Application (Express.js):**
  - Backend server built using Express.js.
  - Implements RESTful APIs to handle requests from the client-side application.
  - Provides data processing and other backend functionalities.

## Installation

To run the project locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/mehwishasif01/vulse-quiz-client.git
   ```

2. Navigate to the project directory:
   ```bash
   cd project-name
   ```
3. Install dependencies for both the client and server:

   ```bash
    # Install client-side dependencies
    cd vulse-quiz-client
    npm install

    # Install server-side dependencies
    cd ../server
    npm install
   ```

4. Start the client and server applications:

   ```bash
   # Start the client-side application
   cd vulse-quiz-client
   npm run dev

    # Start the server-side application
    cd ../server
    npm start

   ```

5. Access the application in your web browser:

   ```bash
   http://localhost:3000

   ```

## Configuration

**Environment Variables:**

- Both the client and server applications use environment variables for configuration.
- Create a `.env` file in the root of each application directory (`vulse-quiz-client` and `server`) to define environment variables. Refer to `.env.example` files for required variables.

## Usage

**Client-side Application:**

- Access the client-side application in your web browser at [http://localhost:3000](http://localhost:3000).
- Interact with the user interface to perform various actions supported by the application.

**Server-side Application:**

- The server-side application exposes APIs at specific endpoints (e.g., `/api`).
- Use API endpoints to interact with the server and perform backend operations.

# Development

## Client-side Development

- All the client side related source code is present in the `vulse-quiz-client` directory.
- I have utilizedd hot-reloading provided by Next.js for a smooth development experience.
- I have used useQuery from React Query for efficient data fetching and caching.
- Applied the Tailwind CSS for responsive and customizable styling of the user interface.

## Server-side Development

- All the server-side application source code located in the server directory.
- I have utilized nodemon for automatic server restarts during development.
- Used the Express.js as the web framework for handling HTTP requests and routing.
- Employed Prisma ORM for database access and manipulation, providing a type-safe interface to the database.
- Utilized Zod for schema validation to ensure data integrity and security.

  ### API Documentation

  Welcome to the API Documentation for Vulse Quiz Web Application.

  #### Introduction

  Welcome to the Quiz Web Application API documentation. This API provides endpoints to manage quizzes, questions, and user results for an online quiz platform. Whether you're a developer integrating with our platform or a user looking to create, participate in, or analyze quizzes, this API has you covered.

  #### Key Features

  - **Quiz Management:** Create, and delete quizzes with ease.
  - **Question Handling:** Add, modify, or remove questions within quizzes seamlessly.
  - **User Interaction:** Enable users to participate in quizzes, submit answers, and view their results.
  - **Scoring and Analysis:** Calculate scores for quiz submissions and provide results to users.

  ## Database Design

  Our backend database consists of the following models, each representing a distinct entity in our application's data schema:

  1.  User

      ```
      id        Int
      username  String
      email     String
      password  String
      createdAt DateTime
      updatedAt DateTime
      ```

  2.  Quiz
      ```
      id          Int
      title       String
      description String
      createdAt   DateTime
      updatedAt   DateTime
      questions   Question[]
      ```
  3.  Question
      ```
      id            Int
      title         String
      options       Option[]
      correctOption Int?
      quizId        Int?
      quiz          Quiz?
      createdAt     DateTime
      updatedAt     DateTime
      score         Int
      ```
  4.  Option
      ```
      id         Int
      label      String
      question   Question?
      questionId Int?
      ```

  ## Endpoints

  This section will discuss all the endpoints in detail.

  ### Create Quiz

  - **Description:** This endpoint is used to create a quiz.
  - **URL:** `/api/quizzes`
  - **Method:** `POST`
  - **Request Payload:**
    The request payload should be a JSON object containing the following fields:

  - `title` (type: string, required): Title of quiz.
  - `description` (type: string, required): Description of quiz.
  - `questions` (type: Question[], required): Array of questions in the quiz

  - **Payload:**

  ```json
  {
    "tile": "Maths",
    "description": "This is a mathematical quiz.",
    "questions": [
      {
        "title": "What is 2 + 2 = ?",
        "correctOption": "2",
        "score": 10,
        "options": [
          { "label": "4" },
          { "label": "2" },
          { "label": "7" },
          { "label": "8" }
        ]
      }
    ]
  }
  ```

  - **Response:**

  ```json
  {
    "id": 26,
    "title": "Maths",
    "description": "This is a mathematical quiz.",
    "createdAt": "2024-03-18T15:33:20.513Z",
    "updatedAt": "2024-03-18T15:33:20.513Z",
    "questions": [
      {
        "id": 43,
        "title": "What is 2+2?",
        "correctOption": 230,
        "quizId": 26,
        "createdAt": "2024-03-18T15:33:20.459Z",
        "updatedAt": "2024-03-18T15:33:20.513Z",
        "score": 10
      }
    ]
  }
  ```

  ### Get All Quizzes

  - **Description:** This endpoint is used to get the list of all quizzes.
  - **URL:** `/api/quizzes`
  - **Method:** `GET`
  - **Request Payload:**
    None required

  - **Response:**

  ```json
  [
    {
      "id": 26,
      "title": "Maths",
      "description": "This is a mathematical quiz.",
      "createdAt": "2024-03-18T15:33:20.513Z",
      "updatedAt": "2024-03-18T15:33:20.513Z",
      "questions": [
        {
          "id": 43,
          "title": "What is 2+2?",
          "correctOption": 230,
          "quizId": 26,
          "createdAt": "2024-03-18T15:33:20.459Z",
          "updatedAt": "2024-03-18T15:33:20.513Z",
          "score": 10,
          "options": [
            {
              "id": 229,
              "label": "3",
              "questionId": 43
            },
            {
              "id": 230,
              "label": "4",
              "questionId": 43
            },
            {
              "id": 231,
              "label": "7",
              "questionId": 43
            },
            {
              "id": 232,
              "label": "6",
              "questionId": 43
            }
          ]
        }
      ]
    }
  ]
  ```

  ### Get A Single Quiz

  - **Description:** This endpoint is used to get a specific quiz.
  - **URL:** `/api/quizzes/:id`
  - **Method:** `GET`
  - **Path Parameters:** `id` (type: integer, required)
  - **Request Payload:**
    None required

  - **Example Request:** `GET /api/quizzes/26`

  - **Response:**

  ```json
  {
    "id": 26,
    "title": "Maths",
    "description": "This is a mathematical quiz.",
    "createdAt": "2024-03-18T15:33:20.513Z",
    "updatedAt": "2024-03-18T15:33:20.513Z",
    "questions": [
      {
        "id": 43,
        "title": "What is 2+2?",
        "correctOption": 230,
        "quizId": 26,
        "createdAt": "2024-03-18T15:33:20.459Z",
        "updatedAt": "2024-03-18T15:33:20.513Z",
        "score": 10,
        "options": [
          {
            "id": 229,
            "label": "3",
            "questionId": 43
          },
          {
            "id": 230,
            "label": "4",
            "questionId": 43
          },
          {
            "id": 231,
            "label": "7",
            "questionId": 43
          },
          {
            "id": 232,
            "label": "6",
            "questionId": 43
          }
        ]
      }
    ]
  }
  ```

  ### Delete Quiz

  - **Description:** This endpoint is used to delete a specific quiz.
  - **URL:** `/api/quizzes/:id`
  - **Method:** `DELETE`
  - **Path Parameters:** `id` (type: integer, required)
  - **Request Payload:**
    None required

  - **Example Request:** `DELETE /api/quizzes/26`

  - **Response:**

  ```json
  { "message": "Quiz deleted successfully" }
  ```

  ### Get Quiz Results

  - **Description:** This endpoint is used to get the results of a specific quiz.
  - **URL:** `/api/quizzes/:id/results`
  - **Method:** `POST`
  - **Path Parameters:** `id` (type: integer, required)
    The request payload should be a JSON object containing the following fields:

  - `questionId` (type: integer, required): To get the specific question .

  - `optionId` (type: integer, required): To get the specific option of the question.

  - **Payload:**

  ```json
  [{ "questionId": 43, "optionId": 230 }]
  ```

  - **Response:**

  ```json
  {
    "score": 10,
    "correctOptions": 1,
    "total": 10,
    "message": "Quiz completed successfully! Here are your results"
  }
  ```

  ## Error Handling

  The API returns standard HTTP status codes to indicate the success or failure of a request. Here are some of the common status codes used:

  - `200 OK`: The request was successful.
  - `400 Bad Request`: The client sent an invalid request.
  - `401 Unauthorized`: The client needs to authenticate to access the resource.
  - `404 Not Found`: The requested resource was not found.
  - `500 Internal Server Error`: An unexpected error occurred on the server.

  ### Error Response Format

  Error responses from the API follow a standard format:

  ```json
  {
    "error": {
      "message": "Error message describing the issue."
    }
  }
  ```
