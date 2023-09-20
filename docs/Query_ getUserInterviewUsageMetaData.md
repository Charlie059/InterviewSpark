# Query: getUserInterviewUsageMetaData

## getUserInterviewUsageMetaData(emailAddress: AWSEmail!): UserInterviewUsageMetaData!

This query retrieves usage metadata for a user's interviews.

Input

* `emailAddress: AWSEmail!`: The email address of the user whose interview usage metadata should be retrieved.

Output

* `UserInterviewUsageMetaData`: An object containing the user's interview usage metadata.

UserInterviewUsageMetaData Fields

* `userInterviewNumCount: Int`: The total number of interviews conducted by the user.
* `userInterviewQuestionSet: [Int]`: The total number of unique interview question sets used by the user.

Example

```graphql
query GetUserInterviewUsageMetaData {
  getUserInterviewUsageMetaData(emailAddress: "user@example.com") {
    userInterviewNumCount
    userInterviewQuestionSet
  }
}
```

Errors This query may return the following errors:

* `UserNotFoundError`: The user with the given email address was not found.
* `InternalServerError`: An internal server error occurred while processing the request.

### Pipeline

[getUserHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/e3vcju3pdzgbdozlqovta3v2ni/edit?referrer=/schema/Query/getUserInterviewUsageMetaData/pipelineResolver)

[getUserInterviewUsageMetaDataHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/urwkguhfabfgnkmm6i55subgdq/edit?referrer=/schema/Query/getUserInterviewUsageMetaData/pipelineResolver)
