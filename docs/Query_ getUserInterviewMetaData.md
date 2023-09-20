# Query: getUserInterviewMetaData

## getUserInterviewMetaData

This query returns a single Interview object with the given email address, interview ID and interview question ID.

### Input

* emailAddress: AWSEmail!: The email address of the user who owns the interview.
* interviewID: String!: The ID of the interview to retrieve metadata for.
* interviewQuestionID: String!: The ID of the question associated with the interview.

### Output

Interview: An object representing an interview.

Interview Fields

* interviewID: String!: The ID of the interview.
* interviewDateTime: AWSDateTime!: The date and time the interview was conducted.
* interviewQuestionID: String!: The ID of the question associated with the interview.
* interviewVideoKey: String!: The S3 key of the interview video.
* `interviewQuestion: String`: The interview question

### Example

```graphql
query GetInterviewMetaData {
  getUserInterviewMetaData(
    emailAddress: "user@example.com",
    interviewID: "1234",
    interviewQuestionID: "5678"
  ) {
    interviewID
    interviewDateTime
    interviewQuestionID
    interviewVideoKey
    interviewQuestion
  }
}
```

### Errors

This query may return the following errors:

* UserNotFoundError: The user with the given email address was not found.
* InterviewNotFoundError: The interview with the given ID was not found.
* ArgumentMissingError: The query is missing an argument.
* InternalServerError: An internal server error occurred while processing the request.

#### Pipeline

[getUserHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/e3vcju3pdzgbdozlqovta3v2ni/edit?referrer=/schema/Query/getInterviewsByQuestionID/pipelineResolver)

[getUserInterviewMetaDataHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/rsyjibfklrenjcwcapdbcxxqnq/edit?referrer=/schema/Query/getUserInterviewMetaData/pipelineResolver)
