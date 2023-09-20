# Query: searchUserInterviews

## searchUserInterviews

This function returns a list of interviews belonging to the specified user, identified by their email address, that contain the specified keyword in their question or id.

Arguments:

* `emailAddress` (required): The email address of the user whose interviews should be searched.
* `keyword` (required): The keyword to search for in the interviews' questions.

Return Value: This function returns an `InterviewList` object, which is a list of interviews belonging to the specified user that contain the specified keyword in their question. Each interview in the list contains the following fields:

* `interviewID`: A unique identifier for the interview.
* `interviewDateTime`: The date and time that the interview was conducted.
* `interviewQuestionID`: A unique identifier for the question that was asked during the interview.
* `interviewVideoKey`: The S3 key for the video recording of the interview.
* `interviewQuestion`: The question that was asked during the interview.
* `interviewQuestionType`: The type of the question that was asked during the interview.

### Example

Examples: The following example query retrieves a list of interviews for the user with email address "[example@example.com](mailto:example@example.com)" that contain the keyword "Java":

```graphql
query SearchUserInterviews {
  searchUserInterviews(emailAddress: "example@example.com", keyword: "Java") {
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

* ArgumentMissingError: The query is missing an argument.
* InternalServerError: An internal server error occurred while processing the request.

### Pipeline

searchUserInterviewsLambda
