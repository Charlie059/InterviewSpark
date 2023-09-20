# Query: getUserInterviewsPaginated

## getUserInterviewsPaginated`(emailAddress: AWSEmail!, limit: Int, nextToken: String)`

This query returns a paginated list of `Interview` objects associated with the given email address.

### Input

* `emailAddress: AWSEmail!`: The email address of the user whose interviews should be retrieved.
* `limit: Int`: The maximum number of items to return in a page. Optional; default is 10.
* `nextToken: String`: A token to specify where to start paginating. Optional.

### Output

* `PaginatedInterviewList`: An object representing a paginated list of interviews.

**`PaginatedInterviewList` Fields**

* `interviewList: [Interview]`: A list of `Interview` objects representing the user's interviews.
* `nextToken: String`: A token to specify where to start paginating for the next page of results.
* `totalRecords: Int`: The total number of `Interview`

**`Interview` Fields**

* `interviewID: String`: The ID of the interview.
* `interviewDateTime: AWSDateTime`: The date and time the interview was conducted.
* `interviewQuestionID: String`: The ID of the question associated with the interview.
* `interviewVideoKey: String`: The S3 key of the interview video.
* `interviewQuestion: String`: The interview question

### Example

```graphql
query GetInterviewList {
  getUserInterviewsPaginated(emailAddress: "user@example.com", limit: 10, nextToken: "abc123") {
    interviewList {
      interviewID
      interviewDateTime
      interviewQuestionID
      interviewVideoKey
      interviewQuestion
    }
    nextToken
    totalRecords
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

[getUserHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/e3vcju3pdzgbdozlqovta3v2ni/edit?referrer=/schema/Query/getWorkHistories/pipelineResolver)

[getInterviewListPaginatedHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/rehqexh6ejbo7pe5gjjnivvqey/edit?referrer=/schema/Query/getInterviewsPaginated/pipelineResolver)

[getTotalUserInterviewCount](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/kxg7kgl6qrb5vavj6e33lkrpcq/edit?referrer=/schema/Query/getInterviewsPaginated/pipelineResolver)
