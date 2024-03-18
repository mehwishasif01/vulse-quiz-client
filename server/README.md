# API Documentation

Welcome to the API Documentation for Vulse Quiz Web Application.

## Introduction

Welcome to the Quiz Web Application API documentation. This API provides endpoints to manage quizzes, questions, and user results for an online quiz platform. Whether you're a developer integrating with our platform or a user looking to create, participate in, or analyze quizzes, this API has you covered.

#### Key Features

- **Quiz Management:** Create, and delete quizzes with ease.
- **Question Handling:** Add, modify, or remove questions within quizzes seamlessly.
- **User Interaction:** Enable users to participate in quizzes, submit answers, and view their results.
- **Scoring and Analysis:** Calculate scores for quiz submissions and provide results to users.

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
