# Query: getUserInterviewsByMonth

getUserInterviewsByMonth(emailAddress: AWSEmail!): InterviewList!

This query returns a list of interviews in the current month

## Arguments

* emailAddress: AWSEmail!: The email address of the user to retrieve interviews for.

## Return Value

* InterviewList: An object representing a list of interviews for the user.
  * interviewList: \[Interview]!: An array of Interview objects containing interview details.
    * interviewID: String!: The unique identifier for the interview.
    * interviewDateTime: AWSDateTime!: The date and time the interview was conducted.
    * interviewQuestionID: String!: The unique identifier for the interview question.
    * interviewVideoKey: String!: The S3 key for the interview video.
    * interviewQuestion: String!: The text of the interview question.
    * interviewQuestionType: String!: The type of interview question.

\

### Examples

Retrieve a list of interviews grouped by month for a user with the email address `john@example.com`:

```javascript
query GetUserInterviewsByMonth {
  getUserInterviewsByMonth(emailAddress: "user@example.com") {
    interviewList {
      interviewID
      interviewDateTime
      interviewQuestionID
      interviewVideoKey
      interviewQuestion
      interviewQuestionType
    }
  }
}

```

### Errors

This query may return the following errors:

* `UserNotFoundError`: The user with the given email address was not found.
* `ArgumentMissingError`: The query is missing argument
* `InternalServerError`: An internal server error occurred while processing the request.

* There is no InterviewNotFoundError, if no work histories, query will return empty array

#### Pipeline

getUserInterviewByMonthLambda
