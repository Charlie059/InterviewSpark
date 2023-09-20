# Query: getUserInterviewsByQuestionID(Deprecated)

getUserInterviewsByQuestionID(emailAddress: AWSEmail!, interviewID: String!): InterviewList!

This query returns a list of interview objects associated with a specific interview ID and email address.

## Input

* `emailAddress: AWSEmail!`: The email address of the user whose interview should be retrieved.
* `interviewID: String!`: The ID of the interview to retrieve.

## Output

* `InterviewList`: An object representing a list of interviews.
* `InterviewList Fields`:
  * `interviewList: [Interview]`: A list of interview objects representing the user's interviews matching the interview ID.
* `Interview Fields`:
  * `interviewID: String`: The ID of the interview.
  * `interviewDateTime: AWSDateTime`: The date and time the interview was conducted.
  * `interviewQuestionID: String`: The ID of the question associated with the interview.
  * `interviewVideoKey: String`: The S3 key of the interview video.

### Example

```graphql
GetInterviewListByID {
  getUserInterviewsByQuestionID(emailAddress: "user@example.com", interviewID: "123") {
    interviewList {
      interviewID
      interviewDateTime
      interviewQuestionID
      interviewVideoKey
    }
  }
}
```

Errors This query may return the following errors:

* `UserNotFoundError`: The user with the given email address was not found.
* `ArgumentMissingError`: The query is missing an argument.
* `InternalServerError`: An internal server error occurred while processing the request.

#### Pipeline

[getUserHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/e3vcju3pdzgbdozlqovta3v2ni/edit?referrer=/schema/Query/getInterviewsByQuestionID/pipelineResolver)

[getInterviewListByQuestionHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/lfvczee6sra7pamgvmjvyjxvoy/edit?referrer=/schema/Query/getInterviewsByQuestionID/pipelineResolver)
