# Query: getUserWorkHistories

## `getUserWorkHistories(emailAddress: AWSEmail!)`

This query returns a list of `WorkHistory` objects associated with the given email address.

### Input

* `emailAddress: AWSEmail!`: The email address of the user whose work histories should be retrieved.

### Output

* `WorkHistories`: An object representing the user's work histories.

**`WorkHistories` Fields**

* `workHistory: [WorkHistory]`: A list of `WorkHistory` objects representing the user's work histories.

**`WorkHistory` Fields**

* `workHistoryJobTitle: String`: The title of the user's job.
* `workHistoryEmployer: String`: The employer of the user.
* `workHistoryStartDate: AWSDate`: The start date of the user's employment.
* `workHistoryEndDate: AWSDate`: The end date of the user's employment.
* `workHistoryJobDescription: String`: The description of the user's job.

#### Example

```graphql
query GetWorkHistories {
  getUserWorkHistories(emailAddress: "user@example.com") {
    workHistory {
      workHistoryJobTitle
      workHistoryEmployer
      workHistoryStartDate
      workHistoryEndDate
      workHistoryJobDescription
    }
  }
}
```

#### Errors

This query may return the following errors:

* `UserNotFoundError`: The user with the given email address was not found.
* `ArgumentMissingError`: The query is missing argument
* `InternalServerError`: An internal server error occurred while processing the request.

* There is no EducationsNotFoundError, if no work histories, query will return empty array

#### Pipeline

[getUserHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/e3vcju3pdzgbdozlqovta3v2ni/edit?referrer=/schema/Query/getWorkHistories/pipelineResolver)

[getWorkHistoriesHelper](https://us-east-1.console.aws.amazon.com/appsync/home?region=us-east-1#/up5npfondvavvieupq7axw567m/v1/functions/b4kfmtj7tffsrams37tzcrkwa4/edit?referrer=/schema/Query/getWorkHistories/pipelineResolver)
